import { describe, expect, it } from 'vitest';
import { hashToIndex } from '../hash';

describe('hashToIndex string length', () => {
  it('supports numeric string lengths through JavaScript coercion', () => {
    expect(hashToIndex('stacks', '4')).toBeLessThan(4);
  });
});
