import { describe, expect, it } from 'vitest';
import { SCHEMAS } from '../validation';

describe('POLL schema negative option id', () => {
  it('rejects negative poll options', () => {
    expect(SCHEMAS.POLL.optionId(-1)).toBe(false);
  });
});
