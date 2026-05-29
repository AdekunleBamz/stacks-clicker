import { describe, expect, it } from 'vitest';
import { formatWalletShort } from '../format';

describe('formatWalletShort empty input', () => {
  it('returns an empty label for blank wallet values', () => {
    expect(formatWalletShort('   ')).toBe('');
  });
});
