import { describe, expect, it } from 'vitest';
import { formatCountdown } from '../format';

describe('formatCountdown zero', () => {
  it('formats zero milliseconds as zero seconds', () => {
    expect(formatCountdown(0)).toBe('0s');
  });
});
