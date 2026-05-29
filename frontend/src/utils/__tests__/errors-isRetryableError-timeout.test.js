import { describe, expect, it } from 'vitest';
import { isRetryableError } from '../errors';

describe('isRetryableError timeout code', () => {
  it('treats timeout errors as retryable', () => {
    expect(isRetryableError('(err u408)')).toBe(true);
  });
});
