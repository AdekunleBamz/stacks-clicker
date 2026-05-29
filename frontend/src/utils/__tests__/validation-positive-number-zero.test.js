import { describe, expect, it } from 'vitest';
import { isPositiveNumber } from '../validation';

describe('isPositiveNumber zero input', () => {
  it('rejects zero', () => {
    expect(isPositiveNumber(0)).toBe(false);
  });
});
