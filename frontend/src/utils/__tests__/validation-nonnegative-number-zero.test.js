import { describe, expect, it } from 'vitest';
import { isNonNegativeNumber } from '../validation';

describe('isNonNegativeNumber zero input', () => {
  it('accepts zero', () => {
    expect(isNonNegativeNumber(0)).toBe(true);
  });
});
