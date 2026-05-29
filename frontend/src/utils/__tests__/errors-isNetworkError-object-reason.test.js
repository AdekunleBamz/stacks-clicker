import { describe, expect, it } from 'vitest';
import { isNetworkError } from '../errors';

describe('isNetworkError reason input', () => {
  it('detects network text in reason fields', () => {
    expect(isNetworkError({ reason: 'DNS lookup failed' })).toBe(true);
  });
});
