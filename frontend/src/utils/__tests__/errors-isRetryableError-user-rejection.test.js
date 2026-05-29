import { describe, expect, it } from 'vitest';
import { isRetryableError } from '../errors';

describe('isRetryableError user rejection', () => {
  it('does not treat wallet rejection as retryable', () => {
    expect(isRetryableError('(err u401)')).toBe(false);
  });
});
