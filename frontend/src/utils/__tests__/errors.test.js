import { describe, expect, test } from 'vitest';
import { parseContractError } from '../errors';

describe('parseContractError', () => {
  test('maps numeric contract codes to friendly messages', () => {
    expect(parseContractError('(err u101)')).toContain('Insufficient Funds');
  });

  test('maps user rejected messages to rejection copy', () => {
    expect(parseContractError('User rejected transaction')).toContain('User Rejected');
  });

  test('maps insufficient-balance strings to insufficient funds copy', () => {
    expect(parseContractError('insufficient balance for fee')).toContain('Insufficient Funds');
  });

  test('parses error objects using their message property', () => {
    expect(parseContractError({ message: '(err u100)' })).toContain('Unauthorized');
  });

  test('falls back to truncated raw message when code is unknown', () => {
    const message =
      'This is an unknown error message that is intentionally long for fallback truncation coverage';
    expect(parseContractError(message)).toMatch(/^Transaction failed: /);
  });
});
