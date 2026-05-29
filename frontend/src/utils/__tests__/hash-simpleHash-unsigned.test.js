import { describe, expect, it } from 'vitest';
import { simpleHash } from '../hash';

describe('simpleHash unsigned range', () => {
  it('returns a non-negative integer', () => {
    expect(simpleHash('tip-sent')).toBeGreaterThanOrEqual(0);
  });
});
