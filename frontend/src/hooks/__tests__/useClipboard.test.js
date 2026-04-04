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
});
