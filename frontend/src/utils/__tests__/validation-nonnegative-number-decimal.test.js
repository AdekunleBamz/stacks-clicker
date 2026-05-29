import { describe, expect, it } from 'vitest';
import { isNonNegativeNumber } from '../validation';

describe('isNonNegativeNumber decimal values', () => {
  it('accepts non-negative decimals', () => {
    expect(isNonNegativeNumber(0.5)).toBe(true);
  });
});
