import { describe, expect, it } from 'vitest';
import { validatePayload } from '../validation';

describe('validatePayload invalid payload', () => {
  it('throws when a validator fails', () => {
    expect(() => validatePayload({ amount: 0 }, { amount: (value) => value > 0 })).toThrow(
      'amount'
    );
  });
});
