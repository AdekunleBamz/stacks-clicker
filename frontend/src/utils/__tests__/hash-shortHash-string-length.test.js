import { describe, expect, it } from 'vitest';
import { shortHash } from '../hash';

describe('shortHash numeric string length', () => {
  it('accepts numeric string lengths', () => {
    expect(shortHash('stacks', '4')).toHaveLength(4);
  });
});
