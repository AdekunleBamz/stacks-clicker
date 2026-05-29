import { describe, expect, it } from 'vitest';
import { isPositiveInteger } from '../validation';

describe('isPositiveInteger negative values', () => {
  it('rejects negative integers', () => {
    expect(isPositiveInteger(-1)).toBe(false);
  });
});
