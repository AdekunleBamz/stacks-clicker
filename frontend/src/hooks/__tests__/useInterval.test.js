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

  it('does not schedule interval for negative delays', () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    renderHook(() => useInterval(callback, -100));

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('supports zero-delay intervals', () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    renderHook(() => useInterval(callback, 0));

    act(() => {
      vi.advanceTimersByTime(5);
    });

    expect(callback).toHaveBeenCalled();
  });

  it('uses the latest callback after rerender', () => {
    vi.useFakeTimers();
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();

    const { rerender } = renderHook(({ cb }) => useInterval(cb, 1000), {
      initialProps: { cb: firstCallback },
    });

    rerender({ cb: secondCallback });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(firstCallback).not.toHaveBeenCalled();
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });

  it('clears scheduled interval on unmount', () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    const { unmount } = renderHook(() => useInterval(callback, 1000));

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    unmount();

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(callback).toHaveBeenCalledTimes(1);
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
