import { describe, expect, it } from 'vitest';
import { isTestnetAddress } from '../validation';

describe('isTestnetAddress SP prefix', () => {
  it('rejects mainnet-prefixed addresses', () => {
    expect(isTestnetAddress('SP123456789ABCDEFGHJKLMNPQRSTVWXYZ1234')).toBe(false);
  });
});
