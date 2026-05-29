import { describe, expect, it } from 'vitest';
import { shortHash } from '../hash';

describe('shortHash default length', () => {
  it('uses an eight-character default digest', () => {
    expect(shortHash('gamma')).toHaveLength(8);
  });
});
