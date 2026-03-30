import { describe, expect, test } from 'vitest';
import { parseContractError } from '../errors';

describe('parseContractError', () => {
  test('maps numeric contract codes to friendly messages', () => {
    expect(parseContractError('(err u101)')).toContain('Insufficient Funds');
  });
});
