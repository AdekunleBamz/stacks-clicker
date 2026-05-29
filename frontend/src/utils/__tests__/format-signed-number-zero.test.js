import { describe, expect, it } from 'vitest';
import { formatSignedNumber } from '../format';

describe('formatSignedNumber zero', () => {
  it('formats zero with an explicit plus sign', () => {
    expect(formatSignedNumber(0)).toBe('+0.00');
  });
});
