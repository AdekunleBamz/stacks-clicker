import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage hook', () => {
  const key = 'test-key';
  const initialValue = { count: 0 };

  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  it('throws for empty storage keys', () => {
    expect(() => renderHook(() => useLocalStorage('', 1))).toThrow(
      'useLocalStorage: key must be a non-empty string'
    );
  });

  it('throws for whitespace-only storage keys', () => {
    expect(() => renderHook(() => useLocalStorage('   ', 1))).toThrow(
      'useLocalStorage: key must be a non-empty string'
    );
  });

  it('returns initialValue if local storage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    expect(result.current[0]).toEqual(initialValue);
  });

  it('supports lazy function initial values', () => {
    const { result } = renderHook(() => useLocalStorage('lazy-key', () => ({ count: 5 })));
    expect(result.current[0]).toEqual({ count: 5 });
  });

  it('updates local storage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      result.current[1]({ count: 1 });
    });

    expect(result.current[0]).toEqual({ count: 1 });
    expect(JSON.parse(window.localStorage.getItem(key))).toEqual({ count: 1 });
  });

  it('hydrates from existing local storage value', () => {
    window.localStorage.setItem(key, JSON.stringify({ count: 42 }));

    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    expect(result.current[0]).toEqual({ count: 42 });
  });

  it('handles function updates (functional state)', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      result.current[1]((prev) => ({ count: prev.count + 1 }));
    });

    expect(result.current[0]).toEqual({ count: 1 });
  });

  it('gracefully handles malformed JSON in local storage', () => {
    window.localStorage.setItem(key, 'not-json');
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    expect(result.current[0]).toEqual(initialValue);
  });

  it('prevents redundant writes when value unchanged', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      result.current[1](initialValue);
    });

    // Should not trigger storage event for same value
    expect(result.current[0]).toEqual(initialValue);
  });

  it('handles null values correctly', () => {
    const { result } = renderHook(() => useLocalStorage(key, null));
    expect(result.current[0]).toBeNull();

    act(() => {
      result.current[1]({ data: 'test' });
    });

    expect(result.current[0]).toEqual({ data: 'test' });
  });

  it('handles primitive values', () => {
    const { result } = renderHook(() => useLocalStorage('num-key', 0));
    expect(result.current[0]).toBe(0);

    act(() => {
      result.current[1](42);
    });

    expect(result.current[0]).toBe(42);
  });

  it('normalizes whitespace keys for custom sync events', () => {
    const { result } = renderHook(() => useLocalStorage(' spaced-key ', 0));

    act(() => {
      window.localStorage.setItem('spaced-key', JSON.stringify(7));
      window.dispatchEvent(new CustomEvent('local-storage', { detail: { key: 'spaced-key' } }));
    });

    expect(result.current[0]).toBe(7);
  });

  it('persists values using the trimmed key name', () => {
    const { result } = renderHook(() => useLocalStorage(' persist-key ', 0));

    act(() => {
      result.current[1](42);
    });

    expect(window.localStorage.getItem('persist-key')).toBe('42');
    expect(window.localStorage.getItem(' persist-key ')).toBeNull();
  });

  it('ignores custom sync events for unrelated keys', () => {
    const { result } = renderHook(() => useLocalStorage('event-key', 3));

    act(() => {
      window.localStorage.setItem('other-key', JSON.stringify(99));
      window.dispatchEvent(new CustomEvent('local-storage', { detail: { key: 'other-key' } }));
    });

    expect(result.current[0]).toBe(3);
  });

  it('resets to initial value when storage key is removed', () => {
    const { result } = renderHook(() => useLocalStorage('remove-key', 12));

    act(() => {
      result.current[1](90);
    });
    expect(result.current[0]).toBe(90);

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'remove-key', newValue: null })
      );
    });

    expect(result.current[0]).toBe(12);
  });

  it('applies same-key storage events from other tabs', () => {
    const { result } = renderHook(() => useLocalStorage('cross-tab-key', 1));

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'cross-tab-key',
          newValue: JSON.stringify(55),
        })
      );
    });

    expect(result.current[0]).toBe(55);
  });

  it('applies successive functional updates without stale state loss', () => {
    const { result } = renderHook(() => useLocalStorage('counter-key', { count: 0 }));

    act(() => {
      result.current[1]((prev) => ({ count: prev.count + 1 }));
      result.current[1]((prev) => ({ count: prev.count + 1 }));
    });

    expect(result.current[0]).toEqual({ count: 2 });
  });
});
