import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WalletContext } from '../../context/WalletContext';
import { useTipJar } from '../useTipJar';
import { callContract } from '../../utils/stacksWallet';
import { DEPLOYER_ADDRESS, CONTRACT_NAMES } from '../../config/contracts';

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

describe('useTipJar hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    callContract.mockResolvedValue({ txId: '0x123' });
  });

  it('calls the deployed TipJar ping function for self ping', async () => {
    const onTxSubmit = vi.fn();
    const { result } = renderHook(() => useTipJar({ onTxSubmit }), { wrapper });

    await act(async () => {
      await result.current.handleSelfPing();
    });

    expect(callContract).toHaveBeenCalledWith({
      contractAddress: DEPLOYER_ADDRESS,
      contractName: CONTRACT_NAMES.tipjar,
      functionName: 'ping',
      functionArgs: [],
    });
    expect(onTxSubmit).toHaveBeenCalledWith('self-ping', '0x123');
  });
});
