import { describe, expect, it } from 'vitest';
import { stringToColor } from '../hash';

describe('stringToColor format prefix', () => {
  it('returns an hsl color string', () => {
    expect(stringToColor('leaderboard')).toMatch(/^hsl\(/);
  });
});
