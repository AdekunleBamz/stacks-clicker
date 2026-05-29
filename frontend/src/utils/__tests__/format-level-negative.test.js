import { describe, expect, it } from 'vitest';
import { formatLevel } from '../format';

describe('formatLevel negative input', () => {
  it('clamps negative levels to zero', () => {
    expect(formatLevel(-2)).toBe('Lv.0');
  });
});
