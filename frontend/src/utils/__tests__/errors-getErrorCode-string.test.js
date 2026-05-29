import { describe, expect, it } from 'vitest';
import { getErrorCode } from '../errors';

describe('getErrorCode string input', () => {
  it('extracts numeric codes from strings', () => {
    expect(getErrorCode('(err u408)')).toBe('408');
  });
});
