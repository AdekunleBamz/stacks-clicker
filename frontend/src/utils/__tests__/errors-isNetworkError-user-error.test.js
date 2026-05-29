import { describe, expect, it } from 'vitest';
import { isNetworkError } from '../errors';

describe('isNetworkError user error', () => {
  it('does not classify user rejection as a network error', () => {
    expect(isNetworkError('user rejected transaction')).toBe(false);
  });
});
