import { describe, expect, it } from 'vitest';
import { validatePayload } from '../validation';

describe('validatePayload prototype safety', () => {
  it('only reads own schema keys', () => {
    expect(validatePayload({}, Object.create({ amount: () => false }))).toBe(true);
  });
});
