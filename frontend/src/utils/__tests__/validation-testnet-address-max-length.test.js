import { describe, expect, it } from 'vitest';
import { isTestnetAddress } from '../validation';

describe('isTestnetAddress maximum length', () => {
  it('accepts a testnet address at the upper length boundary', () => {
    expect(isTestnetAddress(`ST${'A'.repeat(41)}`)).toBe(true);
  });
});
