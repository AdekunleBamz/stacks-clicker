import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useClicker } from '../useClicker';
import { useNotifications } from '../useNotifications';
import { callContract } from '../../utils/walletconnect';

// Mock dependencies
vi.mock('../useNotifications', () => ({
  useNotifications: () => ({
    showError: vi.fn(),
    showLoading: vi.fn(),
  }),
}));

vi.mock('../../utils/walletconnect', () => ({
  callContract: vi.fn(),
}));

describe('useClicker hook', () => {
  const onTxSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with correct loading states', () => {
    const { result } = renderHook(() => useClicker({ onTxSubmit }));
    expect(result.current.isLoading('click')).toBe(false);
  });

  it('handles a successful click transaction', async () => {
    const mockTxId = '0x123';
    callContract.mockResolvedValueOnce({ txId: mockTxId });

    const { result } = renderHook(() => useClicker({ onTxSubmit }));

    // Trigger click - Wrapped in act because it updates state
    let promise;
    await act(async () => {
      promise = result.current.click();
    });

    expect(callContract).toHaveBeenCalled();
    expect(onTxSubmit).toHaveBeenCalledWith('🎯 Click', mockTxId);
    expect(result.current.isLoading('click')).toBe(false);
  });

  it('handles a failed click transaction', async () => {
    const mockError = new Error('User Rejected');
    callContract.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useClicker({ onTxSubmit }));

    await act(async () => {
      try {
        await result.current.click();
      } catch (e) {
        // Expected
      }
    });

    expect(result.current.isLoading('click')).toBe(false);
  });

  it('correctly handles multi-click payloads', async () => {
    callContract.mockResolvedValueOnce({ txId: '0x' });
    const { result } = renderHook(() => useClicker({ onTxSubmit }));

    await act(async () => {
      await result.current.multiClick(10);
    });

    expect(callContract).toHaveBeenCalledWith(expect.objectContaining({
      functionName: 'multi-click',
      functionArgs: [{ type: 'uint128', value: '10' }]
    }));
  });

  it('handles ping action', async () => {
    callContract.mockResolvedValueOnce({ txId: '0xping' });
    const { result } = renderHook(() => useClicker({ onTxSubmit }));

    await act(async () => {
      await result.current.ping();
    });

    expect(callContract).toHaveBeenCalledWith(expect.objectContaining({
      functionName: 'ping'
    }));
  });

  it('handles reset-streak action', async () => {
    callContract.mockResolvedValueOnce({ txId: '0xreset' });
    const { result } = renderHook(() => useClicker({ onTxSubmit }));

    await act(async () => {
      await result.current.resetStreak();
    });

    expect(callContract).toHaveBeenCalledWith(expect.objectContaining({
      functionName: 'reset-streak'
    }));
  });
});
