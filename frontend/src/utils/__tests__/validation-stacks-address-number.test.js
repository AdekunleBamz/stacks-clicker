import { describe, expect, it } from 'vitest';
import { isStacksAddress } from '../validation';

describe('isStacksAddress type guard', () => {
  it('rejects numeric input', () => {
    expect(isStacksAddress(12345)).toBe(false);
  });
});
