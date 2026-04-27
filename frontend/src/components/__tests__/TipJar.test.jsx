import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TipJar from '../TipJar';
import { WalletContext } from '../../context/WalletContext';
import { callContract } from '../../utils/walletconnect';

// Mock WalletContext
const mockWalletValue = {
  isConnected: true,
  address: 'SP3K8AD8ARD4VTC6K1D75X9P90NVST68S2K6PP4Y',
};

// Mock callContract
vi.mock('../../utils/walletconnect', () => ({
  callContract: vi.fn(),
}));

describe('TipJar component', () => {
  const onTxSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderTipJar = (walletValue = mockWalletValue) => {
    return render(
      <WalletContext.Provider value={walletValue}>
        <TipJar onTxSubmit={onTxSubmit} />
      </WalletContext.Provider>
    );
  };

  it('renders correctly when connected', () => {
    renderTipJar();
    expect(screen.getByText(/TipJar/i)).toBeDefined();
    expect(screen.getByText(/Quick Tip/i)).toBeDefined();
  });

  it('handles quick tip click', async () => {
    callContract.mockResolvedValueOnce({ txId: '0x123' });
    renderTipJar();

    const quickTipBtn = screen.getByText(/Quick Tip/i);
    fireEvent.click(quickTipBtn);

    expect(callContract).toHaveBeenCalledWith(expect.objectContaining({
      functionName: 'quick-tip'
    }));
  });

  it('prevents tipping when not connected', () => {
    renderTipJar({ isConnected: false });
    const quickTipBtn = screen.getByText(/Quick Tip/i);
    fireEvent.click(quickTipBtn);

    expect(callContract).not.toHaveBeenCalled();
  });

  it('updates tip amount from input and handles custom tip', async () => {
    callContract.mockResolvedValueOnce({ txId: '0x456' });
    renderTipJar();

    // Find input (assuming it has a label or descriptive text)
    // Looking at the TipJar.jsx preview, it has setTipAmount(1000)
    const amountInput = screen.getByRole('spinbutton'); // Assuming type="number"
    const recipientInput = screen.getByPlaceholderText('SP123...');

    fireEvent.change(amountInput, { target: { value: '5000' } });

    const tipUserBtn = screen.getByText(/Tip User/i);
    fireEvent.click(tipUserBtn);

    expect(callContract).toHaveBeenCalledWith(expect.objectContaining({
      functionName: 'tip-user',
      functionArgs: expect.arrayContaining([
        expect.objectContaining({ value: '5000' })
      ])
    }));
  });
});
