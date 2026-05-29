import { describe, expect, it } from 'vitest';
import { isStacksAddress } from '../validation';

describe('isStacksAddress overlong input', () => {
  it('rejects mainnet addresses past the upper length boundary', () => {
    expect(isStacksAddress(`SP${'A'.repeat(42)}`)).toBe(false);
  });
});
