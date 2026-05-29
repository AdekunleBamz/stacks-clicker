import { describe, expect, it } from 'vitest';
import { shortHash } from '../hash';

describe('shortHash decimal length', () => {
  it('truncates decimal lengths before slicing', () => {
    expect(shortHash('stacks', 3.9)).toHaveLength(3);
  });
});
