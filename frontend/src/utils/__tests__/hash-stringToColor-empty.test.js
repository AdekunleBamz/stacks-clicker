import { describe, expect, it } from 'vitest';
import { stringToColor } from '../hash';

describe('stringToColor empty string', () => {
  it('uses hue zero for guarded empty input', () => {
    expect(stringToColor('')).toBe('hsl(0, 70%, 65%)');
  });
});
