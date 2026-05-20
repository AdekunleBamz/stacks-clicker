import { expect, test, describe } from 'vitest';
import {
  formatAutoClickerCount,
  formatBlockHeight,
  formatBytes,
  formatClickRate,
  formatCompact,
  formatCountdown,
  formatDuration,
  formatLeaderboardPosition,
  formatLevel,
  formatNumber,
  formatNumberCompact,
  formatPercent,
  formatSignedNumber,
  formatStx,
  formatTransactionId,
  formatWalletShort,
  normalizeDecimalPlaces,
  truncateAddress,
} from '../format';

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

    test('returns the full address when both visible segments are disabled', () => {
      expect(truncateAddress(address, { prefix: 0, suffix: 0 })).toBe(address);
    });
  });

  describe('formatNumber', () => {
    test('formats large numbers with commas', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
    });

    test('specifies precision if provided in options', () => {
      expect(formatNumber(1234.567, { minimumFractionDigits: 1, maximumFractionDigits: 1 })).toBe(
        '1,234.6'
      );
    });

    test('returns 0 for non-finite input', () => {
      expect(formatNumber(undefined)).toBe('0');
      expect(formatNumber(Number.NaN)).toBe('0');
    });

    test('formats numeric string input', () => {
      expect(formatNumber('1200')).toBe('1,200');
    });

    test('preserves precision for bigint input', () => {
      expect(formatNumber(12345678901234567890n)).toBe('12,345,678,901,234,567,890');
    });
  });

  describe('formatNumberCompact', () => {
    test('formats thousands with the K suffix', () => {
      expect(formatNumberCompact(1500)).toBe('1.5K');
    });

    test('formats millions with the M suffix', () => {
      expect(formatNumberCompact(2_000_000)).toBe('2.0M');
    });

    test('returns small values without suffixes', () => {
      expect(formatNumberCompact(999)).toBe('999');
    });

    test('returns 0 for invalid compact input', () => {
      expect(formatNumberCompact(Number.NaN)).toBe('0');
    });
  });

  describe('formatCompact', () => {
    test('uses Intl compact notation for large values', () => {
      expect(formatCompact(1_250_000)).toBe('1.3M');
    });
  });

  describe('formatPercent', () => {
    test('formats decimal ratios as percentages', () => {
      expect(formatPercent(0.1234, 2)).toBe('12.34%');
    });

    test('returns 0 percent for invalid values', () => {
      expect(formatPercent(undefined)).toBe('0%');
    });
  });

  describe('normalizeDecimalPlaces', () => {
    test('accepts non-negative integer decimal places', () => {
      expect(normalizeDecimalPlaces(4)).toBe(4);
    });

    test('falls back when decimal places are invalid', () => {
      expect(normalizeDecimalPlaces(-1, 3)).toBe(3);
    });
  });

  describe('formatDuration', () => {
    test('formats second-only durations', () => {
      expect(formatDuration(45_000)).toBe('45s');
    });

    test('formats mixed minute and second durations', () => {
      expect(formatDuration(150_000)).toBe('2m 30s');
    });

    test('returns 0s for negative durations', () => {
      expect(formatDuration(-1)).toBe('0s');
    });
  });

  describe('formatSignedNumber', () => {
    test('formats positive values with a plus sign', () => {
      expect(formatSignedNumber(1.234, 1)).toBe('+1.2');
    });

    test('formats negative values with a minus sign', () => {
      expect(formatSignedNumber(-0.3, 2)).toBe('-0.30');
    });

    test('returns 0 for invalid signed values', () => {
      expect(formatSignedNumber(Number.NaN)).toBe('0');
    });
  });

  describe('formatBytes', () => {
    test('formats zero bytes', () => {
      expect(formatBytes(0)).toBe('0 B');
    });

    test('formats kibibyte-sized values', () => {
      expect(formatBytes(1536)).toBe('1.5 KB');
    });

    test('returns 0 B for invalid byte counts', () => {
      expect(formatBytes(-10)).toBe('0 B');
    });
  });

  describe('formatTransactionId', () => {
    test('normalizes and truncates transaction ids', () => {
      expect(formatTransactionId(' ABCDEFGHIJKL ', { prefix: 4, suffix: 3 })).toBe('abcd...jkl');
    });

    test('returns empty string for missing transaction ids', () => {
      expect(formatTransactionId(null)).toBe('');
    });

    test('returns full transaction ids when visible segments are disabled', () => {
      expect(formatTransactionId('ABC123', { prefix: 0, suffix: 0 })).toBe('abc123');
    });
  });

  describe('formatStx', () => {
    test('converts micro-STX to STX with 2 decimals', () => {
      expect(formatStx(1000000)).toBe('1.00 STX');
      expect(formatStx(500000)).toBe('0.50 STX');
    });

    test('preserves precision for bigint micro-STX values', () => {
      expect(formatStx(12345678901234567890n)).toBe('12,345,678,901,234.57 STX');
    });

    test('formats negative bigint micro-STX values with a leading sign', () => {
      expect(formatStx(-1234567n)).toBe('-1.23 STX');
    });

    test('formats zero bigint amounts without introducing signs or commas', () => {
      expect(formatStx(0n)).toBe('0.00 STX');
    });
    test('returns 0.00 STX for non-finite input', () => {
      expect(formatStx(undefined)).toBe('0.00 STX');
      expect(formatStx(Number.NaN)).toBe('0.00 STX');
    });
  });
});
