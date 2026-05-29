import { describe, expect, it } from 'vitest';
import { simpleHash } from '../hash';

describe('simpleHash deterministic output', () => {
  it('returns the same hash for repeated input', () => {
    expect(simpleHash('click-confirmed')).toBe(simpleHash('click-confirmed'));
  });
});
