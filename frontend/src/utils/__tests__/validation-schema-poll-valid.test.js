import { describe, expect, it } from 'vitest';
import { SCHEMAS } from '../validation';

describe('POLL schema option id', () => {
  it('accepts zero as the first poll option', () => {
    expect(SCHEMAS.POLL.optionId(0)).toBe(true);
  });
});
