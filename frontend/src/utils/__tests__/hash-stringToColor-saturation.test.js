import { describe, expect, it } from 'vitest';
import { stringToColor } from '../hash';

describe('stringToColor saturation', () => {
  it('uses the shared saturation token', () => {
    expect(stringToColor('wallet')).toContain('70%');
  });
});
