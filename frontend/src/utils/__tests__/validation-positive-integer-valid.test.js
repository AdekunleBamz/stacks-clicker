import { describe, expect, it } from 'vitest';
import { isPositiveInteger } from '../validation';

describe('isPositiveInteger positive input', () => {
  it('accepts whole numbers above zero', () => {
    expect(isPositiveInteger(7)).toBe(true);
  });
});
