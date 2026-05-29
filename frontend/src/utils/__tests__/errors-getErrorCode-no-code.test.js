import { describe, expect, it } from 'vitest';
import { getErrorCode } from '../errors';

describe('getErrorCode without numeric code', () => {
  it('returns null when no code is present', () => {
    expect(getErrorCode('wallet rejected')).toBeNull();
  });
});
