import { describe, expect, it } from 'vitest';
import { isUserRejection } from '../errors';

describe('isUserRejection canceled spelling', () => {
  it('detects single-l canceled messages', () => {
    expect(isUserRejection('transaction canceled')).toBe(true);
  });
});
