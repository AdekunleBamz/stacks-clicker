import { describe, expect, it } from 'vitest';
import { formatClickRate } from '../format';

describe('formatClickRate invalid input', () => {
  it('returns zero clicks per second for invalid values', () => {
    expect(formatClickRate(Number.NaN)).toBe('0.0 clicks/s');
  });
});
