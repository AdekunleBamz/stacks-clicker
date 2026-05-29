import { describe, expect, it } from 'vitest';
import { isFiniteNumber } from '../validation';

describe('isFiniteNumber NaN input', () => {
  it('rejects NaN', () => {
    expect(isFiniteNumber(Number.NaN)).toBe(false);
  });
});
