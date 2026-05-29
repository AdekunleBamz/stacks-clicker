import { describe, expect, it } from 'vitest';
import { isStacksAddress } from '../validation';

describe('isStacksAddress network prefix', () => {
  it('rejects an ST testnet prefix', () => {
    expect(isStacksAddress('ST123456789ABCDEFGHJKLMNPQRSTVWXYZ1234')).toBe(false);
  });
});
