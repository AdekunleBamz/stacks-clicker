import { describe, expect, it } from 'vitest';
import { isPositiveFiniteNumber } from '../validation';

describe('isPositiveFiniteNumber zero input', () => {
  it('rejects zero', () => {
    expect(isPositiveFiniteNumber(0)).toBe(false);
  });
});
