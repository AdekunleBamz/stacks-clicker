import { describe, expect, it } from 'vitest';
import { isHashEven } from '../hash';

describe('isHashEven empty string', () => {
  it('treats the guarded empty hash as even', () => {
    expect(isHashEven('')).toBe(true);
  });
});
