import { describe, expect, it } from 'vitest';
import { isRetryableError } from '../errors';

describe('isRetryableError network code', () => {
  it('treats broadcast network errors as retryable', () => {
    expect(isRetryableError('Error: 500')).toBe(true);
  });
});
