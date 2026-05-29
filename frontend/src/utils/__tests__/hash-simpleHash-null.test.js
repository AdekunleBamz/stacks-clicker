import { describe, expect, it } from 'vitest';
import { simpleHash } from '../hash';

describe('simpleHash null guard', () => {
  it('returns zero for null input', () => {
    expect(simpleHash(null)).toBe(0);
  });
});
