import { describe, expect, it } from 'vitest';
import { MIN_TIP_MICRO_STX } from '../constants';
import { SCHEMAS } from '../validation';

describe('TIP schema threshold amount', () => {
  it('accepts the configured minimum tip', () => {
    expect(SCHEMAS.TIP.amount(MIN_TIP_MICRO_STX)).toBe(true);
  });
});
