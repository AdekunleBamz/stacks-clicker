import { describe, expect, it } from 'vitest';
import { isBooleanValue } from '../validation';

describe('isBooleanValue string input', () => {
  it('rejects boolean-like strings', () => {
    expect(isBooleanValue('true')).toBe(false);
  });
});
