import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useClipboard } from '../useClipboard';
import { notify } from '../../utils/toast';

vi.mock('../../utils/toast', () => ({
  notify: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('useClipboard hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
    document.execCommand = vi.fn().mockReturnValue(true);
  });

  it('copies text and exposes the copied state on success', async () => {
    const { result } = renderHook(() => useClipboard());

    let copied;
    await act(async () => {
      copied = await result.current.copyToClipboard('SP123');
    });

    expect(copied).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('SP123');
    expect(notify.success).toHaveBeenCalledWith('Copied to clipboard!');
    expect(result.current.copied).toBe(true);
  });

  it('keeps the copied state alive until the latest copy timeout expires', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useClipboard({ timeout: 2000 }));

    await act(async () => {
      await result.current.copyToClipboard('first');
    });

    await act(async () => {
      vi.advanceTimersByTime(1000);
      await result.current.copyToClipboard('second');
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.copied).toBe(false);
    vi.useRealTimers();
  });

  it('falls back to document.execCommand when the Clipboard API is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: undefined,
    });

    const { result } = renderHook(() => useClipboard());

    let copied;
    await act(async () => {
      copied = await result.current.copyToClipboard('fallback');
    });

    expect(copied).toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
    expect(notify.success).toHaveBeenCalledWith('Copied to clipboard!');
  });
});
