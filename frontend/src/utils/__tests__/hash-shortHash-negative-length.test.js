import { describe, expect, it } from 'vitest';
import { shortHash } from '../hash';

describe('shortHash negative length', () => {
  it('clamps negative lengths to one character', () => {
    expect(shortHash('stacks', -4)).toHaveLength(1);
  });
});
