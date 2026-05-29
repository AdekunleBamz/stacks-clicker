import { describe, expect, it } from 'vitest';
import { isNonNegativeNumber } from '../validation';

describe('isNonNegativeNumber NaN input', () => {
  it('rejects NaN', () => {
    expect(isNonNegativeNumber(Number.NaN)).toBe(false);
  });
});
