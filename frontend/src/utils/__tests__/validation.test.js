import { describe, it, expect } from 'vitest';
import { isValidStacksAddress, validatePayload, SCHEMAS } from '../validation';

describe('isValidStacksAddress', () => {
  it('should return true for valid mainnet addresses', () => {
    expect(isValidStacksAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT')).toBe(true);
  });

  it('should return true for valid testnet addresses', () => {
    expect(isValidStacksAddress('ST5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT')).toBe(true);
  });

  it('should return false for invalid addresses', () => {
    expect(isValidStacksAddress('invalid-address')).toBe(false);
    expect(isValidStacksAddress('')).toBe(false);
    expect(isValidStacksAddress(null)).toBe(false);
    expect(isValidStacksAddress(undefined)).toBe(false);
  });

  it('should return false for addresses with wrong prefix', () => {
    expect(isValidStacksAddress('AB5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT')).toBe(false);
  });
});

describe('validatePayload', () => {
  it('should return true for valid payload', () => {
    const payload = { amount: 10 };
    expect(validatePayload(payload, SCHEMAS.CLICK)).toBe(true);
  });

  it('should throw for invalid payload', () => {
    const payload = { amount: -1 };
    expect(() => validatePayload(payload, SCHEMAS.CLICK)).toThrow();
  });
});
