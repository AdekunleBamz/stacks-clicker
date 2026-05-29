import { describe, expect, it } from 'vitest';
import { isNonNegativeNumber } from '../validation';

describe('isNonNegativeNumber infinite input', () => {
  it('rejects Infinity', () => {
    expect(isNonNegativeNumber(Infinity)).toBe(false);
  });
});
