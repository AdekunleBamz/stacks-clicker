import { describe, expect, it } from 'vitest';
import { isBooleanValue } from '../validation';

describe('isBooleanValue object wrapper', () => {
  it('rejects Boolean object wrappers', () => {
    expect(isBooleanValue(new Boolean(true))).toBe(false);
  });
});
