import { describe, expect, it } from 'vitest';
import { SCHEMAS } from '../validation';

describe('TIP schema small amount', () => {
  it('rejects tiny tip amounts', () => {
    expect(SCHEMAS.TIP.amount(1)).toBe(false);
  });
});
