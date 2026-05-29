import { describe, expect, it } from 'vitest';
import { SCHEMAS } from '../validation';

describe('CLICK schema string amount', () => {
  it('rejects string amounts', () => {
    expect(SCHEMAS.CLICK.amount('1')).toBe(false);
  });
});
