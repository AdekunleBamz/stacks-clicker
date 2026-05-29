import { describe, expect, it } from 'vitest';
import { isValidPollingInterval } from '../validation';

describe('isValidPollingInterval infinity', () => {
  it('rejects infinite intervals', () => {
    expect(isValidPollingInterval(Infinity)).toBe(false);
  });
});
