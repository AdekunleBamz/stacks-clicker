import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WalletProvider, useWallet } from '../context/WalletContext';
import * as walletConnect from '../utils/walletconnect';

vi.mock('../utils/walletconnect', () => ({
  getAddresses: vi.fn(),
  initProvider: vi.fn(),
  isValidProjectId: vi.fn(),
  wcConnect: vi.fn(),
  wcDisconnect: vi.fn(),
}));

const TestComponent = () => {
  const {
    address,
    isConnected,
    connectWallet,
    disconnectWallet,
    walletConnectUri,
    closeWalletConnectModal,
  } = useWallet();

  return (
    <div>
      <div data-testid="status">{isConnected ? 'Connected' : 'Disconnected'}</div>
      <div data-testid="address">{address || 'No Address'}</div>
      <div data-testid="pairing-uri">{walletConnectUri || 'No URI'}</div>
      <button type="button" onClick={connectWallet}>Connect</button>
      <button type="button" onClick={disconnectWallet}>Disconnect</button>
      <button type="button" onClick={closeWalletConnectModal}>Close QR</button>
    </div>
  );
};

describe('WalletContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    walletConnect.isValidProjectId.mockReturnValue(true);
    walletConnect.initProvider.mockResolvedValue({});
    walletConnect.getAddresses.mockRejectedValue(new Error('No active session'));
    walletConnect.wcConnect.mockImplementation(async (onDisplayUri) => {
      onDisplayUri?.('wc:test-pairing-uri');
      return { topic: 'test-topic' };
    });
    walletConnect.wcDisconnect.mockResolvedValue();
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

  it('restores an existing WalletConnect session if available', async () => {
    walletConnect.getAddresses.mockResolvedValueOnce({ address: 'SP123ABCD' });

    render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('Connected'));
    expect(screen.getByTestId('address')).toHaveTextContent('SP123ABCD');
  });

  it('connects through WalletConnect and stores the resolved address', async () => {
    render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('Disconnected'));
    walletConnect.getAddresses.mockResolvedValueOnce({ address: 'SP9CONNECTED' });

    await act(async () => {
      screen.getByText('Connect').click();
    });

    expect(walletConnect.wcConnect).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('Connected'));
    expect(screen.getByTestId('address')).toHaveTextContent('SP9CONNECTED');
  });

  it('disconnects the active WalletConnect session', async () => {
    walletConnect.getAddresses.mockResolvedValueOnce({ address: 'SP123ABCD' });

    render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('Connected'));

    await act(async () => {
      screen.getByText('Disconnect').click();
    });

    expect(walletConnect.wcDisconnect).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('status')).toHaveTextContent('Disconnected');
    expect(screen.getByTestId('address')).toHaveTextContent('No Address');
  });

  it('hides the pairing QR modal state when requested', async () => {
    render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('Disconnected'));
    walletConnect.getAddresses.mockRejectedValueOnce(new Error('User closed wallet'));

    await act(async () => {
      screen.getByText('Connect').click();
    });

    expect(screen.getByTestId('pairing-uri')).toHaveTextContent('wc:test-pairing-uri');

    act(() => {
      screen.getByText('Close QR').click();
    });

    expect(screen.getByTestId('pairing-uri')).toHaveTextContent('No URI');
  });
});
