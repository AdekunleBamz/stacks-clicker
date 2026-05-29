import { describe, expect, it } from 'vitest';
import { isStacksAddress } from '../validation';

describe('isStacksAddress maximum length', () => {
  it('accepts a mainnet address at the upper length boundary', () => {
    expect(isStacksAddress(`SP${'A'.repeat(41)}`)).toBe(true);
  });
});
