import { describe, expect, it } from 'vitest';
import { formatBytes } from '../format';

describe('formatBytes megabytes', () => {
  it('formats mebibyte-sized values with MB units', () => {
    expect(formatBytes(1_048_576)).toBe('1.0 MB');
  });
});
