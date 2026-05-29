import { describe, expect, it } from 'vitest';
import { isPositiveNumber } from '../validation';

describe('isPositiveNumber finite input', () => {
  it('accepts finite values above zero', () => {
    expect(isPositiveNumber(0.01)).toBe(true);
  });
});
