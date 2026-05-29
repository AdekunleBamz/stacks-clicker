import { describe, expect, it } from 'vitest';
import { isPositiveInteger } from '../validation';

describe('isPositiveInteger decimal input', () => {
  it('rejects decimal values', () => {
    expect(isPositiveInteger(1.5)).toBe(false);
  });
});
