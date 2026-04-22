import { describe, it, expect } from 'vitest';
import {
  isPositiveInteger,
  isNonEmptyString,
  isValidMicroStxAmount,
  isValidPollOptionId,
  isValidStacksAddress,
  isValidWalletAddress,
  validatePayload,
  SCHEMAS,
} from '../validation';

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

  it('should return false for addresses with incorrect length', () => {
    expect(isValidStacksAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9')).toBe(false);
    expect(isValidStacksAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJTX')).toBe(false);
  });

  it('should return false for addresses with lowercase characters', () => {
    expect(isValidStacksAddress('sp5k2rhmsbh4pap4pgx77mcvnk1zeed07cwx9tjt')).toBe(false);
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

  it('should throw for missing required fields', () => {
    const payload = {};
    expect(() => validatePayload(payload, SCHEMAS.CLICK)).toThrow();
  });

  it('should throw for non-object payloads', () => {
    expect(() => validatePayload(null, SCHEMAS.CLICK)).toThrow();
    expect(() => validatePayload('string', SCHEMAS.CLICK)).toThrow();
    expect(() => validatePayload(123, SCHEMAS.CLICK)).toThrow();
  });
});

describe('numeric helpers', () => {
  it('validates non-empty strings after trimming', () => {
    expect(isNonEmptyString(' player ')).toBe(true);
    expect(isNonEmptyString('   ')).toBe(false);
  });

  it('accepts numeric strings for integer checks', () => {
    expect(isPositiveInteger('2')).toBe(true);
    expect(isPositiveInteger('0')).toBe(false);
  });

  it('accepts numeric strings for micro-STX amounts', () => {
    expect(isValidMicroStxAmount('25')).toBe(true);
    expect(isValidMicroStxAmount('-1')).toBe(false);
  });

  it('validates poll option ids with explicit bounds', () => {
    expect(isValidPollOptionId('2', 4)).toBe(true);
    expect(isValidPollOptionId('4', 4)).toBe(false);
  });

  it('uses full Stacks address validation for wallet addresses', () => {
    expect(isValidWalletAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT')).toBe(true);
    expect(isValidWalletAddress('SP123')).toBe(false);
  });
});
