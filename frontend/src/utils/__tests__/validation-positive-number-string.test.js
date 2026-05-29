import { describe, expect, it } from 'vitest';
import { isPositiveNumber } from '../validation';

describe('isPositiveNumber string input', () => {
  it('rejects numeric strings', () => {
    expect(isPositiveNumber('2')).toBe(false);
  });
});
