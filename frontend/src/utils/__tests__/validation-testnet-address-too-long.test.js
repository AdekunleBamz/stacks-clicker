import { describe, expect, it } from 'vitest';
import { isTestnetAddress } from '../validation';

describe('isTestnetAddress overlong input', () => {
  it('rejects testnet addresses past the upper length boundary', () => {
    expect(isTestnetAddress(`ST${'A'.repeat(42)}`)).toBe(false);
  });
});
