import { describe, expect, it } from 'vitest';
import { getErrorCode } from '../errors';

describe('getErrorCode reason input', () => {
  it('extracts numeric codes from reason fields', () => {
    expect(getErrorCode({ reason: 'timeout 408' })).toBe('408');
  });
});
