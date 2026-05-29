import { describe, expect, it } from 'vitest';
import { isBooleanValue } from '../validation';

describe('isBooleanValue true input', () => {
  it('accepts true', () => {
    expect(isBooleanValue(true)).toBe(true);
  });
});
