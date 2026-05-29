import { describe, expect, it } from 'vitest';
import { formatCountdown } from '../format';

describe('formatCountdown negative unit count', () => {
  it('falls back to at least one output unit', () => {
    expect(formatCountdown(61_000, { maxUnits: -2 })).toBe('1m');
  });
});
