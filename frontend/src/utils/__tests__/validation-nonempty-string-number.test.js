import { describe, expect, it } from 'vitest';
import { isNonEmptyString } from '../validation';

describe('isNonEmptyString non-string input', () => {
  it('rejects numbers', () => {
    expect(isNonEmptyString(1)).toBe(false);
  });
});
