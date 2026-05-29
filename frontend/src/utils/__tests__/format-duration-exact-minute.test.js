import { describe, expect, it } from 'vitest';
import { formatDuration } from '../format';

describe('formatDuration exact minute', () => {
  it('omits seconds for exact minute durations', () => {
    expect(formatDuration(120_000)).toBe('2m');
  });
});
