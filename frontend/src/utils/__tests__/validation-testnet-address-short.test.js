import { describe, expect, it } from 'vitest';
import { isTestnetAddress } from '../validation';

describe('isTestnetAddress short input', () => {
  it('rejects short addresses', () => {
    expect(isTestnetAddress('ST123')).toBe(false);
  });
});
