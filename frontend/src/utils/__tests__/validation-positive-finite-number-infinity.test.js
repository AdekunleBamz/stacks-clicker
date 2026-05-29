import { describe, expect, it } from 'vitest';
import { isPositiveFiniteNumber } from '../validation';

describe('isPositiveFiniteNumber infinite input', () => {
  it('rejects Infinity', () => {
    expect(isPositiveFiniteNumber(Infinity)).toBe(false);
  });
});
