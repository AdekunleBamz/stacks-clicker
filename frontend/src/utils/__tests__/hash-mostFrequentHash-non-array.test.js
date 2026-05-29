import { describe, expect, it } from 'vitest';
import { getMostFrequentHash } from '../hash';

describe('getMostFrequentHash non-array input', () => {
  it('returns null for non-array values', () => {
    expect(getMostFrequentHash('not-a-list')).toBeNull();
  });
});
