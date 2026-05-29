import { describe, expect, it } from 'vitest';
import { getErrorCode } from '../errors';

describe('getErrorCode null input', () => {
  it('returns null for missing errors', () => {
    expect(getErrorCode(null)).toBeNull();
  });
});
