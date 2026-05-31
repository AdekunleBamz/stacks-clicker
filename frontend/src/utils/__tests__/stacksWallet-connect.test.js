import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  connect as stacksConnect,
  getLocalStorage,
  isConnected as stacksIsConnected,
} from '@stacks/connect';
import { connectStacksWallet, getAddresses } from '../stacksWallet';

vi.mock('@stacks/connect', () => ({
  connect: vi.fn(),
  disconnect: vi.fn(),
  isConnected: vi.fn(),
  getLocalStorage: vi.fn(),
  openContractCall: vi.fn(),
  openSTXTransfer: vi.fn(),
}));

describe('stacksWallet', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    stacksIsConnected.mockReturnValue(false);
    getLocalStorage.mockReturnValue(null);
  });

  it('uses the Stacks address returned by connect before local storage is ready', async () => {
    stacksConnect.mockResolvedValue({
      addresses: [
        {
          address: 'bc1qexample',
          publicKey: 'btc-public-key',
        },
        {
          address: 'SP9CONNECTED',
          publicKey: 'stx-public-key',
        },
      ],
    });

    await expect(connectStacksWallet()).resolves.toEqual({
      address: 'SP9CONNECTED',
      publicKey: null,
    });
    expect(stacksConnect).toHaveBeenCalledWith({ network: 'mainnet' });
  });

  it('restores the cached Stacks address from Connect local storage', async () => {
    getLocalStorage.mockReturnValue({
      addresses: {
        stx: [{ address: 'SP123CACHED' }],
        btc: [{ address: 'bc1qexample' }],
      },
      version: '1',
    });

    await expect(getAddresses()).resolves.toEqual({
      address: 'SP123CACHED',
      publicKey: null,
    });
  });
});
