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

  it('returns initialValue if local storage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    expect(result.current[0]).toEqual(initialValue);
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
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    expect(result.current[0]).toEqual(initialValue);
    expect(window.localStorage.getItem(key)).toBeNull();
    expect(warn).toHaveBeenCalledTimes(1);
  });

  it('skips redundant localStorage writes when the next value is unchanged', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      result.current[1]({ count: 0 });
    });

    expect(setItemSpy).not.toHaveBeenCalled();
  });

  it('re-reads the stored value when a matching local-storage custom event fires', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      window.localStorage.setItem(key, JSON.stringify({ count: 9 }));
      window.dispatchEvent(new CustomEvent('local-storage', { detail: { key } }));
    });

    expect(result.current[0]).toEqual({ count: 9 });
  });

  it('ignores storage events for other keys', () => {
    window.localStorage.setItem(key, JSON.stringify({ count: 5 }));
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'other-key',
          newValue: JSON.stringify({ count: 99 }),
        })
      );
    });

    expect(result.current[0]).toEqual({ count: 5 });
  });

  it('falls back to the initial value when a storage event carries malformed JSON', () => {
    window.localStorage.setItem(key, JSON.stringify({ count: 5 }));
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key,
          newValue: 'not-json',
        })
      );
    });

    expect(result.current[0]).toEqual(initialValue);
  });

  it('skips redundant localStorage writes when the next value is unchanged', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      result.current[1]({ count: 0 });
    });

    expect(setItemSpy).not.toHaveBeenCalled();
  });

  it('re-reads the stored value when a matching local-storage custom event fires', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      window.localStorage.setItem(key, JSON.stringify({ count: 9 }));
      window.dispatchEvent(new CustomEvent('local-storage', { detail: { key } }));
    });

    expect(result.current[0]).toEqual({ count: 9 });
  });
});
