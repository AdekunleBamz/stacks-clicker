import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import QuickPoll from '../QuickPoll';
import { WalletContext } from '../../context/WalletContext';
import { callContract } from '../../utils/stacksWallet';

// Mock dependencies
vi.mock('../../utils/stacksWallet', () => ({
  callContract: vi.fn(),
}));

const mockWalletValue = {
  isConnected: true,
  address: 'SP3K8AD8ARD4VTC6K1D75X9P90NVST68S2K6PP4Y',
};

describe('QuickPoll component', () => {
  const onTxSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderQuickPoll = (walletValue = mockWalletValue) => {
    return render(
      <WalletContext.Provider value={walletValue}>
        <QuickPoll onTxSubmit={onTxSubmit} />
      </WalletContext.Provider>
    );
  };

  it('renders correctly with initial stats', () => {
    renderQuickPoll();
    expect(screen.getByText(/QuickPoll/i)).toBeDefined();
    expect(screen.getByText('Yes Votes').parentElement.textContent).toBe('Yes Votes0');
    expect(screen.getByText('No Votes').parentElement.textContent).toContain('0');
  });

  it('does not call the wallet for unsupported poll creation', async () => {
    callContract.mockResolvedValueOnce({ txId: '0xabc' });
    renderQuickPoll();

    const input = screen.getByPlaceholderText(/Enter poll question/i);
    fireEvent.change(input, { target: { value: 'Should we add Dark Mode?' } });

    const createBtn = screen.getByText(/Create Poll/i);
    fireEvent.click(createBtn);

    expect(callContract).not.toHaveBeenCalled();
  });

  it('handles quick voting', async () => {
    callContract.mockResolvedValueOnce({ txId: '0xdef' });
    renderQuickPoll();

    const quickYesBtn = screen.getByText(/Quick Yes/i);
    fireEvent.click(quickYesBtn);

    expect(callContract).toHaveBeenCalledWith(
      expect.objectContaining({
        functionName: 'vote-yes',
        functionArgs: [],
      })
    );
  });

  it('handles specific poll ID voting', async () => {
    callContract.mockResolvedValueOnce({ txId: '0xghi' });
    renderQuickPoll();

    const idInput = screen.getByPlaceholderText('Poll ID');
    fireEvent.change(idInput, { target: { value: '5' } });

    const voteYesBtn = screen.getByText(/Vote Yes #5/i);
    fireEvent.click(voteYesBtn);

    expect(callContract).toHaveBeenCalledWith(
      expect.objectContaining({
        functionName: 'vote-yes',
        functionArgs: [],
      })
    );
  });

  it('prevents voting when disconnected', () => {
    renderQuickPoll({ isConnected: false });
    const quickYesBtn = screen.getByText(/Quick Yes/i);
    fireEvent.click(quickYesBtn);

    expect(callContract).not.toHaveBeenCalled();
  });
});
