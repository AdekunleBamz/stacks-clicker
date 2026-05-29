import { describe, expect, it } from 'vitest';
import { simpleHash } from '../hash';

describe('simpleHash empty string guard', () => {
  it('returns zero for an empty string', () => {
    expect(simpleHash('')).toBe(0);
  });
});
