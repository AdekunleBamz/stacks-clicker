import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WalletContext } from '../../context/WalletContext';
import { useQuickPoll } from '../useQuickPoll';
import { callContract } from '../../utils/stacksWallet';
import { DEPLOYER_ADDRESS, CONTRACT_NAMES } from '../../config/contracts';
import { notify } from '../../utils/toast';

vi.mock('../../utils/stacksWallet', () => ({
  callContract: vi.fn(),
}));

vi.mock('../../utils/toast', () => ({
  notify: {
    info: vi.fn(),
  },
}));

const walletValue = {
  isConnected: true,
  address: 'SP3K8AD8ARD4VTC6K1D75X9P90NVST68S2K6PP4Y',
};

const wrapper = ({ children }) => (
  <WalletContext.Provider value={walletValue}>{children}</WalletContext.Provider>
);

describe('useQuickPoll hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    callContract.mockResolvedValue({ txId: '0x123' });
  });

  it('maps yes and no votes to deployed QuickPoll functions', async () => {
    const { result } = renderHook(() => useQuickPoll(), { wrapper });

    await act(async () => {
      await result.current.vote(1, 1);
      await result.current.vote(1, 2);
    });

    expect(callContract).toHaveBeenNthCalledWith(1, {
      contractAddress: DEPLOYER_ADDRESS,
      contractName: CONTRACT_NAMES.quickpoll,
      functionName: 'vote-yes',
      functionArgs: [],
    });
    expect(callContract).toHaveBeenNthCalledWith(2, {
      contractAddress: DEPLOYER_ADDRESS,
      contractName: CONTRACT_NAMES.quickpoll,
      functionName: 'vote-no',
      functionArgs: [],
    });
  });

  it('does not call the wallet for unsupported poll creation', () => {
    const { result } = renderHook(() => useQuickPoll(), { wrapper });

    act(() => {
      result.current.createPoll('Should we add a new poll?');
    });

    expect(callContract).not.toHaveBeenCalled();
    expect(notify.info).toHaveBeenCalledWith('Poll creation is not available on this contract version.');
  });
});
