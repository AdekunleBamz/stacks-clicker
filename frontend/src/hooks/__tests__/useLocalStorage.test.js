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
});
