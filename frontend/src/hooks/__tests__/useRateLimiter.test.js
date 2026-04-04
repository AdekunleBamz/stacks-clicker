import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useRateLimiter } from '../useRateLimiter';

describe('useRateLimiter hook', () => {
  it('allows the first wrapped call and returns the function result', () => {
    const handler = vi.fn(() => 'ok');
    const { result } = renderHook(() => useRateLimiter({ interval: 1000 }));

    let returned;
    act(() => {
      returned = result.current.withRateLimit(handler)('payload');
    });

    expect(returned).toBe('ok');
    expect(handler).toHaveBeenCalledWith('payload');
    expect(result.current.isLimited).toBe(true);
  });

  it('rejects rapid repeat calls and notifies via onRejected', () => {
    vi.useFakeTimers();
    const handler = vi.fn();
    const onRejected = vi.fn();
    const { result } = renderHook(() => useRateLimiter({ interval: 1000, onRejected }));

    act(() => {
      result.current.withRateLimit(handler)();
    });

    let secondResult;
    act(() => {
      secondResult = result.current.withRateLimit(handler)();
    });

    expect(secondResult).toBe(false);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(onRejected).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('allows immediate reuse after reset is called', () => {
    vi.useFakeTimers();
    const handler = vi.fn();
    const { result } = renderHook(() => useRateLimiter({ interval: 1000 }));

    act(() => {
      result.current.withRateLimit(handler)();
    });

    act(() => {
      result.current.reset();
    });

    let secondResult;
    act(() => {
      secondResult = result.current.withRateLimit(handler)();
    });

    expect(secondResult).toBeUndefined();
    expect(handler).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });
});
