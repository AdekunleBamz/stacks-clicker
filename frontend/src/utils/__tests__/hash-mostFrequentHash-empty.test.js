import { describe, expect, it } from 'vitest';
import { getMostFrequentHash } from '../hash';

describe('getMostFrequentHash empty input', () => {
  it('returns null for an empty list', () => {
    expect(getMostFrequentHash([])).toBeNull();
  });
});
