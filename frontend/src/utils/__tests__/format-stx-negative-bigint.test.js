import { describe, expect, it } from 'vitest';
import { formatStx } from '../format';

describe('formatStx negative bigint input', () => {
  it('preserves the sign for negative bigint values', () => {
    expect(formatStx(-1500000n)).toBe('-1.50 STX');
  });
});
