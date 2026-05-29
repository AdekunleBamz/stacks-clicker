import { describe, expect, it } from 'vitest';
import { hashToIndex } from '../hash';

describe('hashToIndex range', () => {
  it('stays inside the array bounds', () => {
    expect(hashToIndex('beta', 4)).toBeLessThan(4);
  });
});
