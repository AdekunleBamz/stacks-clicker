import { describe, expect, it } from 'vitest';
import { isPositiveNumber } from '../validation';

describe('isPositiveNumber infinite input', () => {
  it('rejects Infinity', () => {
    expect(isPositiveNumber(Infinity)).toBe(false);
  });
});
