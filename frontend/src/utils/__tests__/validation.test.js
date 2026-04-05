import { describe, expect, test } from 'vitest';
import { SCHEMAS, validatePayload } from '../validation';

describe('validation utilities', () => {
  test('accepts valid click payloads', () => {
    expect(validatePayload({ amount: 1 }, SCHEMAS.CLICK)).toBe(true);
  });

  test('rejects tip payloads below the minimum amount', () => {
    expect(() => validatePayload({ amount: 99, recipient: 'SP123' }, SCHEMAS.TIP)).toThrow(
      'Validation failed for key: amount. Value: 99'
    );
  });

  test('rejects tip payloads with non-stacks recipients', () => {
    expect(() => validatePayload({ amount: 100, recipient: '0xabc' }, SCHEMAS.TIP)).toThrow(
      'Validation failed for key: recipient. Value: 0xabc'
    );
  });
});
