import { describe, expect, it } from 'vitest';
import { isValidPollingInterval } from '../validation';

describe('isValidPollingInterval positive input', () => {
  it('accepts positive whole milliseconds', () => {
    expect(isValidPollingInterval(1000)).toBe(true);
  });
});
