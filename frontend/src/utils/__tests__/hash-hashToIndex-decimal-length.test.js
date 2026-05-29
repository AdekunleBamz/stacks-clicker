import { describe, expect, it } from 'vitest';
import { hashToIndex } from '../hash';

describe('hashToIndex decimal length', () => {
  it('keeps decimal length results below the provided upper bound', () => {
    expect(hashToIndex('stacks', 3.5)).toBeLessThan(3.5);
  });
});
