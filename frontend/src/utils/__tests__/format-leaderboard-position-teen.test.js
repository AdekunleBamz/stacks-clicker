import { describe, expect, it } from 'vitest';
import { formatLeaderboardPosition } from '../format';

describe('formatLeaderboardPosition teen ordinal', () => {
  it('formats eleventh place with th suffix', () => {
    expect(formatLeaderboardPosition(11)).toBe('11th place');
  });
});
