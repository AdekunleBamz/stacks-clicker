import { describe, expect, test } from 'vitest';
import { parseContractError } from '../errors';

describe('parseContractError', () => {
  test('maps numeric contract codes to friendly messages', () => {
    expect(parseContractError('(err u101)')).toContain('Insufficient Funds');
  });

  test('maps user rejected messages to rejection copy', () => {
    expect(parseContractError('User rejected transaction')).toContain('User Rejected');
  });

  test('matches user rejected pattern case-insensitively', () => {
    expect(parseContractError('USER REJECTED TX')).toContain('User Rejected');
  });

  test('maps insufficient-balance strings to insufficient funds copy', () => {
    expect(parseContractError('insufficient balance for fee')).toContain('Insufficient Funds');
  });

  test('parses error objects using their message property', () => {
    expect(parseContractError({ message: '(err u100)' })).toContain('Unauthorized');
  });

  test('maps plain numeric strings directly', () => {
    expect(parseContractError('500')).toContain('Network Error');
  });

  test('prefers explicit numeric codes over keyword heuristics', () => {
    expect(parseContractError('Error 101: user rejected')).toContain('Insufficient Funds');
  });

  test('handles null input without throwing', () => {
    expect(parseContractError(null)).toContain('Transaction failed');
  });

  test('keeps short unknown messages untruncated', () => {
    expect(parseContractError('minor network blip')).toBe('Transaction failed: minor network blip');
  });

  test('falls back to truncated raw message when code is unknown', () => {
    const message =
      'This is an unknown error message that is intentionally long for fallback truncation coverage';
    const parsed = parseContractError(message);
    expect(parsed).toMatch(/^Transaction failed: /);
    expect(parsed.endsWith('...')).toBe(true);
  });
});
