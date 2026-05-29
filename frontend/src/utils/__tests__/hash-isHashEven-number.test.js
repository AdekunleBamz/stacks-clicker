import { describe, expect, it } from 'vitest';
import { isHashEven } from '../hash';

describe('isHashEven non-string input', () => {
  it('guards number input through the zero hash', () => {
    expect(isHashEven(123)).toBe(true);
  });
});
