import { describe, expect, it } from 'vitest';
import { isNonEmptyString } from '../validation';

describe('isNonEmptyString content input', () => {
  it('accepts strings after trimming', () => {
    expect(isNonEmptyString('  memo  ')).toBe(true);
  });
});
