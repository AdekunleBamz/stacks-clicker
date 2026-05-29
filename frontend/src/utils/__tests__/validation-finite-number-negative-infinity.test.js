import { describe, expect, it } from 'vitest';
import { isFiniteNumber } from '../validation';

describe('isFiniteNumber negative infinity', () => {
  it('rejects negative infinity', () => {
    expect(isFiniteNumber(-Infinity)).toBe(false);
  });
});
