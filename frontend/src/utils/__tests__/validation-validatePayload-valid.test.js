import { describe, expect, it } from 'vitest';
import { validatePayload } from '../validation';

describe('validatePayload valid payload', () => {
  it('returns true when every validator passes', () => {
    expect(validatePayload({ amount: 1 }, { amount: (value) => value === 1 })).toBe(true);
  });
});
