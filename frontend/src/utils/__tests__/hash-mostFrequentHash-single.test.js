import { describe, expect, it } from 'vitest';
import { getMostFrequentHash, simpleHash } from '../hash';

describe('getMostFrequentHash single value', () => {
  it('returns the hash for the only item', () => {
    expect(getMostFrequentHash(['only'])).toBe(simpleHash('only'));
  });
});
