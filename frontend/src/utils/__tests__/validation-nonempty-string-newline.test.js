import { describe, expect, it } from 'vitest';
import { isNonEmptyString } from '../validation';

describe('isNonEmptyString newline-only input', () => {
  it('rejects newline-only strings after trimming', () => {
    expect(isNonEmptyString('\n')).toBe(false);
  });
});
