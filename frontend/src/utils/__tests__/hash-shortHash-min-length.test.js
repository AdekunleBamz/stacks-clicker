import { describe, expect, it } from 'vitest';
import { shortHash } from '../hash';

describe('shortHash minimum length', () => {
  it('clamps tiny lengths to one character', () => {
    expect(shortHash('gamma', 0)).toHaveLength(8);
  });
});
