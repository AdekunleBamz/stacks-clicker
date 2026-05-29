import { describe, expect, it } from 'vitest';
import { isNetworkError } from '../errors';

describe('isNetworkError offline text', () => {
  it('detects offline messages as network errors', () => {
    expect(isNetworkError('browser is offline')).toBe(true);
  });
});
