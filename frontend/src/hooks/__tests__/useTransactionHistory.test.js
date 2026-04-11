import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTransactionHistory } from '../useTransactionHistory';

vi.mock('../../utils/toast', () => ({
  notify: {
    custom: vi.fn(),
  },
}));

vi.mock('../useDocumentVisibility', () => ({
  useDocumentVisibility: () => true,
}));

describe('useTransactionHistory hook', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  it('updates an existing transaction when tx id is repeated', () => {
    const { result } = renderHook(() => useTransactionHistory({}));

    act(() => {
      result.current.addTxToLog('Click sent', '0xabc', 'pending');
    });

    act(() => {
      result.current.addTxToLog('Click confirmed', '0xabc', 'success');
    });

    expect(result.current.txLog).toHaveLength(1);
    expect(result.current.txLog[0].id).toBe('0xabc');
    expect(result.current.txLog[0].status).toBe('success');
    expect(result.current.txLog[0].isPending).toBe(false);
  });

  it('keeps only the 50 most recent transactions', () => {
    const { result } = renderHook(() => useTransactionHistory({}));

    act(() => {
      for (let i = 0; i < 60; i += 1) {
        result.current.addTxToLog(`Action ${i}`, `0x${i}`, 'success');
      }
    });

    expect(result.current.txLog).toHaveLength(50);
    expect(result.current.txLog[0].id).toBe('0x59');
    expect(result.current.txLog[49].id).toBe('0x10');
  });
});
