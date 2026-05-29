import { describe, expect, it } from 'vitest';
import { isStacksAddress } from '../validation';

describe('isStacksAddress symbol input', () => {
  it('rejects symbol values', () => {
    expect(isStacksAddress(Symbol('SP'))).toBe(false);
  });
});
