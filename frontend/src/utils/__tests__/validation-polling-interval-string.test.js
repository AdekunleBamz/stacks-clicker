import { describe, expect, it } from 'vitest';
import { isValidPollingInterval } from '../validation';

describe('isValidPollingInterval string input', () => {
  it('rejects numeric strings', () => {
    expect(isValidPollingInterval('1000')).toBe(false);
  });
});
