import { describe, expect, it } from 'vitest';
import { getMostFrequentHash, simpleHash } from '../hash';

describe('getMostFrequentHash ties', () => {
  it('keeps the first hash seen when counts are tied', () => {
    expect(getMostFrequentHash(['alpha', 'beta'])).toBe(simpleHash('alpha'));
  });
});
