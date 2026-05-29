import { describe, expect, it } from 'vitest';
import { isValidPollingInterval } from '../validation';

describe('isValidPollingInterval zero input', () => {
  it('rejects zero milliseconds', () => {
    expect(isValidPollingInterval(0)).toBe(false);
  });
});
