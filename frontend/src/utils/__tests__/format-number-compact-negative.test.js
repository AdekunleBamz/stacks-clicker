import { describe, expect, it } from 'vitest';
import { formatNumberCompact } from '../format';

describe('formatNumberCompact negative input', () => {
  it('preserves the sign when compacting negative values', () => {
    expect(formatNumberCompact(-1500)).toBe('-1.5K');
  });
});
