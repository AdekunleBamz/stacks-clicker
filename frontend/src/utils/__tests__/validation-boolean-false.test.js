import { describe, expect, it } from 'vitest';
import { isBooleanValue } from '../validation';

describe('isBooleanValue false input', () => {
  it('accepts false', () => {
    expect(isBooleanValue(false)).toBe(true);
  });
});
