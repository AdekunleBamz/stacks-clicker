import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WalletProvider, useWallet } from '../context/WalletContext';
import * as stacksConnect from '@stacks/connect';

// Mock the openContractCall and showConnect
vi.mock('@stacks/connect', () => ({
  showConnect: vi.fn(),
  disconnect: vi.fn(),
}));

const TestComponent = () => {
  const { address, isConnected, connectWallet, disconnectWallet } = useWallet();
  return (
    <div>
      <div data-testid="status">{isConnected ? 'Connected' : 'Disconnected'}</div>
      <div data-testid="address">{address || 'No Address'}</div>
      <button type="button" onClick={connectWallet}>Connect</button>
      <button type="button" onClick={disconnectWallet}>Disconnect</button>
    </div>
  );
};

// Mock localStorage
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('WalletContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('provides disconnected state by default', () => {
    render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );
    expect(screen.getByTestId('status')).toHaveTextContent('Disconnected');
    expect(screen.getByTestId('address')).toHaveTextContent('No Address');
  });

  it('restores connection from localStorage if available', () => {
    const mockStorage = {
      addresses: { mainnet: 'SP123ABCD' },
    };
    localStorage.setItem('stacks-session', JSON.stringify(mockStorage));

    render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    expect(screen.getByTestId('status')).toHaveTextContent('Connected');
    expect(screen.getByTestId('address')).toHaveTextContent('SP123ABCD');
  });

  it('calls showConnect when connectWallet is triggered', () => {
    render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    const connectBtn = screen.getByText('Connect');
    act(() => {
      connectBtn.click();
    });

    expect(stacksConnect.showConnect).toHaveBeenCalledTimes(1);
    expect(stacksConnect.showConnect).toHaveBeenCalledWith(
      expect.objectContaining({
        appDetails: expect.anything(),
        onFinish: expect.any(Function),
        onCancel: expect.any(Function),
      })
    );
  });

  it('calls disconnect when disconnectWallet is triggered', () => {
    localStorage.setItem(
      'stacks-session',
      JSON.stringify({
        addresses: { mainnet: 'SP123ABCD' },
      })
    );

    render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    const disconnectBtn = screen.getByText('Disconnect');
    act(() => {
      disconnectBtn.click();
    });

    expect(stacksConnect.disconnect).toHaveBeenCalledTimes(1);
    expect(localStorage.removeItem).toHaveBeenCalledWith('stacks-session');
    expect(screen.getByTestId('status')).toHaveTextContent('Disconnected');
  });

  it('reacts to storage updates from another tab', () => {
    render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    localStorage.setItem(
      'stacks-session',
      JSON.stringify({
        addresses: { mainnet: 'SP9UPDATED' },
      })
    );

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'stacks-session',
          newValue: JSON.stringify({ addresses: { mainnet: 'SP9UPDATED' } }),
        })
      );
    });

    expect(screen.getByTestId('status')).toHaveTextContent('Connected');
    expect(screen.getByTestId('address')).toHaveTextContent('SP9UPDATED');
  });
});
