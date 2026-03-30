import { describe, expect, test } from 'vitest';
import { getWalletConnectLink } from '../walletconnect';

describe('getWalletConnectLink', () => {
  test('encodes a wc URI into a walletconnect.com link', () => {
    const uri = 'wc:1234@2?relay-protocol=irn&symKey=abc';
    const link = getWalletConnectLink(uri);
    expect(link).toContain('https://walletconnect.com/wc?uri=');
    expect(link).toContain(encodeURIComponent(uri));
  });

  test('returns empty string for missing URI', () => {
    expect(getWalletConnectLink('')).toBe('');
    expect(getWalletConnectLink(undefined)).toBe('');
  });
});
