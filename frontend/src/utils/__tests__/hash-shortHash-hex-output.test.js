import { describe, expect, it } from 'vitest';
import { shortHash } from '../hash';

describe('shortHash hex output', () => {
  it('returns hexadecimal characters', () => {
    expect(shortHash('zeta')).toMatch(/^[0-9a-f]+$/);
  });
});
