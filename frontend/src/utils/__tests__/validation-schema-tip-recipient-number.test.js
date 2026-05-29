import { describe, expect, it } from 'vitest';
import { SCHEMAS } from '../validation';

describe('TIP schema numeric recipient', () => {
  it('rejects non-string recipients', () => {
    expect(SCHEMAS.TIP.recipient(123)).toBe(false);
  });
});
