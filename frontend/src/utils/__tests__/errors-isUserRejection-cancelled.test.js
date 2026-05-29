import { describe, expect, it } from 'vitest';
import { isUserRejection } from '../errors';

describe('isUserRejection cancelled spelling', () => {
  it('detects double-l cancelled messages', () => {
    expect(isUserRejection('transaction cancelled')).toBe(true);
  });
});
