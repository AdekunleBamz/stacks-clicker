import { describe, expect, it } from 'vitest';
import { isStacksAddress } from '../validation';

describe('isStacksAddress short input', () => {
  it('rejects short addresses', () => {
    expect(isStacksAddress('SP123')).toBe(false);
  });
});
