import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WalletContext } from '../../context/WalletContext';

/**
 * Reusable mock provider for testing components that depend on WalletContext.
 */
export const MockWalletProvider = ({ children, value = {} }) => {
  const defaultValues = {
    address: 'SP3K8AD8ARD4VTC6K1D75X9P90NVST68S2K6PP4Y',
    network: 'mainnet',
    isConnected: true,
    connect: vi.fn(),
    disconnect: vi.fn(),
    ...value,
  };

  return (
    <WalletContext.Provider value={defaultValues}>
      {children}
    </WalletContext.Provider>
  );
};

describe('MockWalletProvider', () => {
  it('provides the mock address to children', () => {
    render(
      <MockWalletProvider value={{ address: 'SP_TEST' }}>
        <WalletContext.Consumer>
          {(ctx) => <div data-testid="address">{ctx.address}</div>}
        </WalletContext.Consumer>
      </MockWalletProvider>
    );
    expect(screen.getByTestId('address').textContent).toBe('SP_TEST');
  });
});
