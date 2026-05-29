import { describe, expect, it } from 'vitest';
import { isNonEmptyString } from '../validation';

describe('isNonEmptyString whitespace input', () => {
  it('rejects strings that only contain spaces', () => {
    expect(isNonEmptyString('   ')).toBe(false);
  });
});
