import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { usePrice } from '../usePrice';

describe('usePrice hook', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    delete global.fetch;
    vi.restoreAllMocks();
  });

  it('loads and exposes the latest STX price', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ blockstack: { usd: 1.23 } }),
    });

    const { result } = renderHook(() => usePrice());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.price).toBe(1.23);
    expect(result.current.error).toBeNull();
  });

  it('ignores abort errors from canceled requests', async () => {
    const abortError = Object.assign(new Error('aborted'), { name: 'AbortError' });
    global.fetch.mockRejectedValueOnce(abortError);
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => usePrice());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('surfaces non-abort fetch errors', async () => {
    const networkError = new Error('network down');
    global.fetch.mockRejectedValueOnce(networkError);
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => usePrice());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(networkError);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('stores an error for non-ok HTTP responses', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => usePrice());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toContain('Network response was not ok');
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('keeps price null when API returns non-finite values', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ blockstack: { usd: Number.POSITIVE_INFINITY } }),
    });

    const { result } = renderHook(() => usePrice());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.price).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
