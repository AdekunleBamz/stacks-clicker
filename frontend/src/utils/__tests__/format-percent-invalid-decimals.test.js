import { describe, expect, it } from 'vitest';
import { formatPercent } from '../format';

describe('formatPercent invalid decimals', () => {
  it('falls back to one decimal place', () => {
    expect(formatPercent(0.5, -1)).toBe('50.0%');
  });
});
