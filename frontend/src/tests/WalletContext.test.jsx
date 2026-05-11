import { act, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { WalletProvider, useWallet } from '../context/WalletContext';
import * as stacksWallet from '../utils/stacksWallet';

vi.mock('../utils/stacksWallet', () => ({
  connectStacksWallet: vi.fn(),
  disconnectStacksWallet: vi.fn(),
  getAddresses: vi.fn(),
  isConnected: vi.fn(),
}));

const TestComponent = () => {
  const { address, isConnected, connectWallet, disconnectWallet } = useWallet();

  return (
    <div>
      <div data-testid="status">{isConnected ? 'Connected' : 'Disconnected'}</div>
      <div data-testid="address">{address || 'No Address'}</div>
      <button type="button" onClick={connectWallet}>
        Connect
      </button>
      <button type="button" onClick={disconnectWallet}>
        Disconnect
      </button>
    </div>
  );
};

describe('WalletContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    stacksWallet.isConnected.mockReturnValue(false);
    stacksWallet.getAddresses.mockRejectedValue(new Error('No active session'));
    stacksWallet.connectStacksWallet.mockResolvedValue({ address: 'SP9CONNECTED' });
    stacksWallet.disconnectStacksWallet.mockReturnValue(undefined);
  });

  it('provides disconnected state by default', async () => {
    render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('Disconnected'));
    expect(screen.getByTestId('address')).toHaveTextContent('No Address');
  });

  it('restores an existing Stacks wallet session if available', async () => {
    stacksWallet.isConnected.mockReturnValue(true);
    stacksWallet.getAddresses.mockResolvedValueOnce({ address: 'SP123ABCD' });

    render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('Connected'));
    expect(screen.getByTestId('address')).toHaveTextContent('SP123ABCD');
  });

  it('connects through the native Stacks wallet and stores the resolved address', async () => {
    render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('Disconnected'));

    await act(async () => {
      screen.getByText('Connect').click();
    });

    expect(stacksWallet.connectStacksWallet).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('Connected'));
    expect(screen.getByTestId('address')).toHaveTextContent('SP9CONNECTED');
  });

  it('disconnects the active Stacks wallet session', async () => {
    stacksWallet.isConnected.mockReturnValue(true);
    stacksWallet.getAddresses.mockResolvedValueOnce({ address: 'SP123ABCD' });

    render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('Connected'));

    await act(async () => {
      screen.getByText('Disconnect').click();
    });

    expect(stacksWallet.disconnectStacksWallet).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('status')).toHaveTextContent('Disconnected');
    expect(screen.getByTestId('address')).toHaveTextContent('No Address');
  });
});
