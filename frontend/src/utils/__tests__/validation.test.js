import { describe, expect, test } from 'vitest';
import { SCHEMAS, validatePayload } from '../validation';

describe('validation utilities', () => {
  test('accepts valid click payloads', () => {
    expect(validatePayload({ amount: 1 }, SCHEMAS.CLICK)).toBe(true);
  });
});
