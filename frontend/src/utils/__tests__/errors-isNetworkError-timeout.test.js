import { describe, expect, it } from 'vitest';
import { isNetworkError } from '../errors';

describe('isNetworkError timeout text', () => {
  it('detects timeout messages as network errors', () => {
    expect(isNetworkError('request timeout')).toBe(true);
  });
});
