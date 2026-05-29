import { describe, expect, it } from 'vitest';
import { isTestnetAddress } from '../validation';

describe('isTestnetAddress casing', () => {
  it('rejects lowercase prefixes', () => {
    expect(isTestnetAddress('st123456789ABCDEFGHJKLMNPQRSTVWXYZ1234')).toBe(false);
  });
});
