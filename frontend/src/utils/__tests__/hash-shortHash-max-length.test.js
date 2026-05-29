import { describe, expect, it } from 'vitest';
import { shortHash } from '../hash';

describe('shortHash maximum length', () => {
  it('never exceeds the padded hash length', () => {
    expect(shortHash('epsilon', 99).length).toBeLessThanOrEqual(8);
  });
});
