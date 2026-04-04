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
});
