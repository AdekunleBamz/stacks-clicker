import { describe, expect, it } from 'vitest';
import { formatTransactionId } from '../format';

describe('formatTransactionId short input', () => {
  it('returns short transaction ids without ellipsis', () => {
    expect(formatTransactionId('ABC123', { prefix: 4, suffix: 4 })).toBe('abc123');
  });
});
