import { describe, expect, it } from 'vitest';
import { formatBlockHeight } from '../format';

describe('formatBlockHeight decimal input', () => {
  it('floors decimal block heights', () => {
    expect(formatBlockHeight(123.9)).toBe('Block #123');
  });
});
