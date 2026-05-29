import { describe, expect, it } from 'vitest';
import { isHashEven } from '../hash';

describe('isHashEven return type', () => {
  it('returns a boolean for string input', () => {
    expect(typeof isHashEven('stacks-clicker')).toBe('boolean');
  });
});
