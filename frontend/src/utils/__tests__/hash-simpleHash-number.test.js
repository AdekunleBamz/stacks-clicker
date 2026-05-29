import { describe, expect, it } from 'vitest';
import { simpleHash } from '../hash';

describe('simpleHash number guard', () => {
  it('returns zero for numeric input', () => {
    expect(simpleHash(42)).toBe(0);
  });
});
