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

  it('keeps cooldown state in sync even when the wrapped callback throws', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useRateLimiter({ interval: 1000 }));

    let caughtError;
    act(() => {
      try {
        result.current.withRateLimit(() => {
          throw new Error('boom');
        })();
      } catch (error) {
        caughtError = error;
      }
    });

    expect(caughtError.message).toBe('boom');
    expect(result.current.isLimited).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.isLimited).toBe(false);

    vi.useRealTimers();
  });

  it('reports remaining cooldown time until the limiter opens again', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-04T00:00:00Z'));

    const { result } = renderHook(() => useRateLimiter({ interval: 1000 }));

    act(() => {
      result.current.withRateLimit(() => true)();
    });

    expect(result.current.remainingMs).toBe(1000);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.remainingMs).toBe(0);
    vi.useRealTimers();
  });

  it('clears the reported remaining cooldown after reset', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-04T00:00:00Z'));

    const { result } = renderHook(() => useRateLimiter({ interval: 1000 }));

    act(() => {
      result.current.withRateLimit(() => true)();
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.isLimited).toBe(false);
    expect(result.current.remainingMs).toBe(0);
    vi.useRealTimers();
  });

  it('returns false on rejected calls even when no onRejected handler is provided', () => {
    vi.useFakeTimers();
    const handler = vi.fn();
    const { result } = renderHook(() => useRateLimiter({ interval: 1000 }));

    act(() => {
      result.current.withRateLimit(handler)();
    });

    let secondResult;
    act(() => {
      secondResult = result.current.withRateLimit(handler)();
    });

    expect(secondResult).toBe(false);
    expect(handler).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
