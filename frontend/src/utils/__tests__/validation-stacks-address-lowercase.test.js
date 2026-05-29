import { describe, expect, it } from 'vitest';
import { isStacksAddress } from '../validation';

describe('isStacksAddress casing', () => {
  it('rejects lowercase addresses', () => {
    expect(isStacksAddress('sp123456789abcdefghjklmnpqrstvwxyz1234')).toBe(false);
  });
});
