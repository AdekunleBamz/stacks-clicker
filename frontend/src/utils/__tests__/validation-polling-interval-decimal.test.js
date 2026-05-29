import { describe, expect, it } from 'vitest';
import { isValidPollingInterval } from '../validation';

describe('isValidPollingInterval decimal input', () => {
  it('rejects fractional milliseconds', () => {
    expect(isValidPollingInterval(1.5)).toBe(false);
  });
});
