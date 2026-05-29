import { describe, expect, it } from 'vitest';
import { isPositiveInteger } from '../validation';

describe('isPositiveInteger zero', () => {
  it('rejects zero', () => {
    expect(isPositiveInteger(0)).toBe(false);
  });
});
