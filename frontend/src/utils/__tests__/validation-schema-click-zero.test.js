import { describe, expect, it } from 'vitest';
import { SCHEMAS } from '../validation';

describe('CLICK schema zero amount', () => {
  it('rejects zero click amounts', () => {
    expect(SCHEMAS.CLICK.amount(0)).toBe(false);
  });
});
