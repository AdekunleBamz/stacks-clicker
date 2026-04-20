import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useInterval } from '../useInterval';

describe('useInterval hook', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('runs callback on the provided interval', () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    renderHook(() => useInterval(callback, 1000));

    act(() => {
      vi.advanceTimersByTime(3200);
    });

    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('does not schedule interval when delay is null', () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    renderHook(() => useInterval(callback, null));

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('does not schedule interval when delay is undefined', () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    renderHook(() => useInterval(callback, undefined));

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('does not throw if callback is missing', () => {
    vi.useFakeTimers();

    expect(() => {
      renderHook(() => useInterval(undefined, 1000));
      act(() => {
        vi.advanceTimersByTime(2000);
      });
    }).not.toThrow();
  });
});
