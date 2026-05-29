import { describe, expect, it } from 'vitest';
import { isValidPollingInterval } from '../validation';

describe('isValidPollingInterval negative values', () => {
  it('rejects negative intervals', () => {
    expect(isValidPollingInterval(-1)).toBe(false);
  });
});
