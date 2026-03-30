import { expect, test, describe } from 'vitest';
import { truncateAddress, formatNumber, formatStx } from '../format';

describe('format utilities', () => {
  describe('truncateAddress', () => {
    const address = 'SP3K8AD8ARD4VTC6K1D75X9P90NVST68S2K6PP4Y';

    test('truncates address with default options', () => {
      expect(truncateAddress(address)).toBe('SP3K...PP4Y');
    });

    test('truncates address with custom prefix and suffix', () => {
      expect(truncateAddress(address, { prefix: 6, suffix: 4 })).toBe('SP3K8A...PP4Y');
    });

    test('returns original address if very short', () => {
      const short = 'SP123';
      expect(truncateAddress(short)).toBe('SP123');
    });

    test('returns empty string if address is missing', () => {
      expect(truncateAddress(null)).toBe('');
    });

    test('normalizes negative prefix and suffix values', () => {
      expect(truncateAddress(address, { prefix: -1, suffix: -2 })).toBe(address);
    });

    test('supports custom separators', () => {
      expect(truncateAddress(address, { separator: '***' })).toBe('SP3K***PP4Y');
    });
  });

  describe('formatNumber', () => {
    test('formats large numbers with commas', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
    });

    test('specifies precision if provided in options', () => {
      expect(formatNumber(1234.567, { minimumFractionDigits: 1, maximumFractionDigits: 1 })).toBe('1,234.6');
    });

    test('returns 0 for non-finite input', () => {
      expect(formatNumber(undefined)).toBe('0');
      expect(formatNumber(Number.NaN)).toBe('0');
    });
  });

  describe('formatStx', () => {
    test('converts micro-STX to STX with 2 decimals', () => {
      expect(formatStx(1000000)).toBe('1.00 STX');
      expect(formatStx(500000)).toBe('0.50 STX');
    });

    test('returns 0.00 STX for non-finite input', () => {
      expect(formatStx(undefined)).toBe('0.00 STX');
      expect(formatStx(Number.NaN)).toBe('0.00 STX');
    });
  });
});
