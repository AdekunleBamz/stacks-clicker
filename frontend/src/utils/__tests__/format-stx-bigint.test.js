import { describe, expect, it } from 'vitest';
import { formatStx } from '../format';

describe('formatStx bigint input', () => {
  it('formats bigint microSTX values without precision loss', () => {
    expect(formatStx(1500000n)).toBe('1.50 STX');
  });
});
