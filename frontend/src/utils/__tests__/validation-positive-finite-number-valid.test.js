import { describe, expect, it } from 'vitest';
import { isPositiveFiniteNumber } from '../validation';

describe('isPositiveFiniteNumber positive input', () => {
  it('accepts finite values above zero', () => {
    expect(isPositiveFiniteNumber(2)).toBe(true);
  });
});
