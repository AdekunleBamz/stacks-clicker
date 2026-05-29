import { describe, expect, it } from 'vitest';
import { stringToColor } from '../hash';

describe('stringToColor lightness', () => {
  it('uses the shared lightness token', () => {
    expect(stringToColor('quickpoll')).toContain('65%');
  });
});
