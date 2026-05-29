import { describe, expect, it } from 'vitest';
import { SCHEMAS } from '../validation';

describe('CLICK schema amount', () => {
  it('accepts positive click amounts', () => {
    expect(SCHEMAS.CLICK.amount(1)).toBe(true);
  });
});
