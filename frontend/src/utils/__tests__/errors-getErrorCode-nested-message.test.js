import { describe, expect, it } from 'vitest';
import { getErrorCode } from '../errors';

describe('getErrorCode nested message input', () => {
  it('extracts numeric codes from nested error messages', () => {
    expect(getErrorCode({ error: { message: '(err u500)' } })).toBe('500');
  });
});
