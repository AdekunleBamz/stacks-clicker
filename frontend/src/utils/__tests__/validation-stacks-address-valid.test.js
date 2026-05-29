import { describe, expect, it } from 'vitest';
import { isStacksAddress } from '../validation';

describe('isStacksAddress valid input', () => {
  it('accepts an SP address with valid characters', () => {
    expect(isStacksAddress('SP123456789ABCDEFGHJKLMNPQRSTVWXYZ1234')).toBe(true);
  });
});
