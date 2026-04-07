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
    expect(getWalletConnectLink('   ')).toBe('');
  });

  test('returns empty string for non-wc URIs', () => {
    expect(getWalletConnectLink('https://example.com')).toBe('');
  });

  test('returns empty string for object-like inputs', () => {
    expect(getWalletConnectLink({})).toBe('');
  });

  test('trims surrounding whitespace before encoding', () => {
    const uri = 'wc:trimmed@2?relay-protocol=irn';
    const link = getWalletConnectLink(`  ${uri}  `);
    expect(link).toContain(encodeURIComponent(uri));
  });

  test('normalizes uppercase WC scheme before encoding', () => {
    const uri = 'WC:upper@2?relay-protocol=irn';
    const link = getWalletConnectLink(uri);
    expect(link).toContain(encodeURIComponent('wc:upper@2?relay-protocol=irn'));
  });

  test('handles null input gracefully', () => {
    expect(getWalletConnectLink(null)).toBe('');
  });

  test('handles URIs with special characters', () => {
    const uri = 'wc:test@2?symKey=abc+def/ghi=';
    const link = getWalletConnectLink(uri);
    expect(link).toContain('https://walletconnect.com/wc?uri=');
  });
});
