import { describe, expect, it } from 'vitest';
import { hashToIndex } from '../hash';

describe('hashToIndex zero length', () => {
  it('falls back to index zero', () => {
    expect(hashToIndex('alpha', 0)).toBe(0);
  });
});
