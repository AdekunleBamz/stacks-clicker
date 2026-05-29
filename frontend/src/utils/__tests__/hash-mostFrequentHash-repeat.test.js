import { describe, expect, it } from 'vitest';
import { getMostFrequentHash, simpleHash } from '../hash';

describe('getMostFrequentHash repeated value', () => {
  it('returns the repeated item hash', () => {
    expect(getMostFrequentHash(['a', 'b', 'b'])).toBe(simpleHash('b'));
  });
});
