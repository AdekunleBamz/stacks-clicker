import { describe, expect, it } from 'vitest';
import { isTestnetAddress } from '../validation';

describe('isTestnetAddress valid input', () => {
  it('accepts an ST address with valid characters', () => {
    expect(isTestnetAddress('ST123456789ABCDEFGHJKLMNPQRSTVWXYZ1234')).toBe(true);
  });
});
