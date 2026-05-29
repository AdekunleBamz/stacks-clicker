import { describe, expect, it } from 'vitest';
import { formatBlockHeight } from '../format';

describe('formatBlockHeight empty input', () => {
  it('returns the placeholder for empty strings', () => {
    expect(formatBlockHeight('')).toBe('--');
  });
});
