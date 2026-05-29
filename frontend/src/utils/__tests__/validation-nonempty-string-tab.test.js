import { describe, expect, it } from 'vitest';
import { isNonEmptyString } from '../validation';

describe('isNonEmptyString tab-only input', () => {
  it('rejects tab-only strings after trimming', () => {
    expect(isNonEmptyString('\t')).toBe(false);
  });
});
