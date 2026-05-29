import { describe, expect, it } from 'vitest';
import { formatCountdown } from '../format';

describe('formatCountdown one unit', () => {
  it('limits output to a single unit when requested', () => {
    expect(formatCountdown(90_061_000, { maxUnits: 1 })).toBe('1d');
  });
});
