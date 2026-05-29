import { describe, expect, it } from 'vitest';
import { SCHEMAS } from '../validation';

describe('POLL schema string option', () => {
  it('rejects string option ids', () => {
    expect(SCHEMAS.POLL.optionId('0')).toBe(false);
  });
});
