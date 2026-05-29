import { describe, expect, it } from 'vitest';
import { validatePayload } from '../validation';

describe('validatePayload extra fields', () => {
  it('ignores payload fields that are not in the schema', () => {
    expect(validatePayload({ amount: 1, memo: 'ok' }, { amount: (value) => value === 1 })).toBe(
      true
    );
  });
});
