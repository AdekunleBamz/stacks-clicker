import { describe, expect, it } from 'vitest';
import { isUserRejection } from '../errors';

describe('isUserRejection object input', () => {
  it('detects user rejection in message fields', () => {
    expect(isUserRejection({ message: 'User rejected request' })).toBe(true);
  });
});
