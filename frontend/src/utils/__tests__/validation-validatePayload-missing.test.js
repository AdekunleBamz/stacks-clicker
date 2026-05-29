import { describe, expect, it } from 'vitest';
import { validatePayload } from '../validation';

describe('validatePayload missing field', () => {
  it('throws when a required field is absent', () => {
    expect(() => validatePayload({}, { recipient: Boolean })).toThrow('recipient');
  });
});
