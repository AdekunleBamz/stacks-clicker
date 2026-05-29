import { describe, expect, it } from 'vitest';
import { formatAutoClickerCount } from '../format';

describe('formatAutoClickerCount plural', () => {
  it('formats plural auto-clicker counts', () => {
    expect(formatAutoClickerCount(2)).toBe('2 auto-clickers');
  });
});
