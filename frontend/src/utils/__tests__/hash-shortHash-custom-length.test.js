import { describe, expect, it } from 'vitest';
import { shortHash } from '../hash';

describe('shortHash custom length', () => {
  it('honors a valid requested length', () => {
    expect(shortHash('delta', 6)).toHaveLength(6);
  });
});
