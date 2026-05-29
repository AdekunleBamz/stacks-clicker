import { describe, expect, it } from 'vitest';
import { isFiniteNumber } from '../validation';

describe('isFiniteNumber string input', () => {
  it('rejects numeric strings', () => {
    expect(isFiniteNumber('1')).toBe(false);
  });
});
