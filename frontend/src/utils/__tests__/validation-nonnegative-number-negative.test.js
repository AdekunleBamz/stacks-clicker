import { describe, expect, it } from 'vitest';
import { isNonNegativeNumber } from '../validation';

describe('isNonNegativeNumber negative input', () => {
  it('rejects negative values', () => {
    expect(isNonNegativeNumber(-1)).toBe(false);
  });
});
