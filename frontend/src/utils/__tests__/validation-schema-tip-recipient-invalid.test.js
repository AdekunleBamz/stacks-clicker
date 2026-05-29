import { describe, expect, it } from 'vitest';
import { SCHEMAS } from '../validation';

describe('TIP schema recipient guard', () => {
  it('rejects non-SP recipients', () => {
    expect(SCHEMAS.TIP.recipient('ST2C2YFPQEMAK6RMAQZ86J3F6G6GKQ69P7B8Z3V9C')).toBe(false);
  });
});
