import { describe, expect, it } from 'vitest';
import { hashToIndex } from '../hash';

describe('hashToIndex negative length', () => {
  it('falls back to index zero', () => {
    expect(hashToIndex('alpha', -3)).toBe(0);
  });
});
