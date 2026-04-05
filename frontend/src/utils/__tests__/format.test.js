import { expect, test, describe } from 'vitest';
import { formatAutoClicker, formatBlockHeight, formatBoostName, formatBoostTimeLeft, formatBytes, formatClickCount, formatClickRate, formatCombo, formatCompact, formatCost, formatCriticalLabel, formatDuration, formatLeaderboardEntry, formatMultiplier, formatPercent, formatPrestigeCount, formatRank, formatRelativeTime, formatScore, formatSessionTime, formatSignedNumber, formatUpgradeLevel, formatUpgradeName, truncateAddress, formatNumber, formatStx, formatWalletShort } from '../format';

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
      expect(formatNumber(1234.567, { minimumFractionDigits: 1, maximumFractionDigits: 1 })).toBe('1,234.6');
    });

    test('returns 0 for non-finite input', () => {
      expect(formatNumber(undefined)).toBe('0');
      expect(formatNumber(Number.NaN)).toBe('0');
      expect(formatNumber(Number.POSITIVE_INFINITY)).toBe('0');
    });

    test('formats numeric string input', () => {
      expect(formatNumber('1200')).toBe('1,200');
    });
  });

  describe('formatCompact', () => {
    test('uses compact notation for large values', () => {
      expect(formatCompact(1200)).toBe('1.2K');
    });

    test('returns zero for invalid compact values', () => {
      expect(formatCompact(Number.POSITIVE_INFINITY)).toBe('0');
    });

    test('formats numeric string compact values', () => {
      expect(formatCompact('2500')).toBe('2.5K');
    });
  });

  describe('formatPercent', () => {
    test('formats decimal ratios as percentages', () => {
      expect(formatPercent(0.125)).toBe('12.5%');
    });

    test('honors explicit percentage precision', () => {
      expect(formatPercent(0.125, 2)).toBe('12.50%');
    });

    test('returns zero percent for invalid values', () => {
      expect(formatPercent(Number.NaN)).toBe('0%');
    });

    test('falls back for invalid percentage precision', () => {
      expect(formatPercent(0.2, -1)).toBe('20.0%');
    });
  });

  describe('formatDuration', () => {
    test('formats second-only durations', () => {
      expect(formatDuration(45000)).toBe('45s');
    });

    test('formats exact minute durations', () => {
      expect(formatDuration(120000)).toBe('2m');
    });

    test('formats mixed minute and second durations', () => {
      expect(formatDuration(150000)).toBe('2m 30s');
    });

    test('returns zero seconds for invalid durations', () => {
      expect(formatDuration(-1)).toBe('0s');
    });
  });

  describe('formatRelativeTime', () => {
    test('formats recent past timestamps in seconds', () => {
      expect(formatRelativeTime(9_000, 10_000)).toBe('1s ago');
    });

    test('formats future timestamps with from-now suffix', () => {
      expect(formatRelativeTime(11_000, 10_000)).toBe('1s from now');
    });

    test('formats minute-scale relative timestamps', () => {
      expect(formatRelativeTime(10_000, 130_000)).toBe('2m ago');
    });

    test('formats hour-scale relative timestamps', () => {
      expect(formatRelativeTime(0, 7_200_000)).toBe('2h ago');
    });

    test('formats day-scale relative timestamps', () => {
      expect(formatRelativeTime(0, 172_800_000)).toBe('2d ago');
    });

    test('returns unknown for invalid timestamps', () => {
      expect(formatRelativeTime('nope', 10_000)).toBe('unknown');
    });
  });

  describe('formatSignedNumber', () => {
    test('adds a plus sign for positive deltas', () => {
      expect(formatSignedNumber(1.5)).toBe('+1.50');
    });

    test('keeps a minus sign for negative deltas', () => {
      expect(formatSignedNumber(-0.3)).toBe('-0.30');
    });

    test('honors signed number precision', () => {
      expect(formatSignedNumber(1.234, 1)).toBe('+1.2');
    });

    test('returns zero for invalid signed numbers', () => {
      expect(formatSignedNumber(undefined)).toBe('0');
    });
  });

  describe('formatBytes', () => {
    test('formats zero bytes', () => {
      expect(formatBytes(0)).toBe('0 B');
    });

    test('formats kilobyte values', () => {
      expect(formatBytes(1536)).toBe('1.5 KB');
    });

    test('honors byte precision options', () => {
      expect(formatBytes(1536, 0)).toBe('2 KB');
    });

    test('returns zero bytes for invalid values', () => {
      expect(formatBytes(-1)).toBe('0 B');
    });
  });

  describe('game display helpers', () => {
    test('formats click counts with separators', () => {
      expect(formatClickCount(1200)).toBe('1,200');
    });

    test('formats scores with two decimals', () => {
      expect(formatScore(3.456)).toBe('3.46');
    });

    test('formats upgrade levels', () => {
      expect(formatUpgradeLevel(4)).toBe('Level 4');
    });

    test('formats multiplier labels', () => {
      expect(formatMultiplier(2)).toBe('2x');
    });

    test('formats upgrade costs with point units', () => {
      expect(formatCost(2500)).toBe('2,500 pts');
    });

    test('formats rank labels', () => {
      expect(formatRank(7)).toBe('#7');
    });

    test('formats boost names with title casing', () => {
      expect(formatBoostName('haste')).toBe('Haste');
    });

    test('formats combo labels', () => {
      expect(formatCombo(12)).toBe('12x combo');
    });

    test('formats prestige labels', () => {
      expect(formatPrestigeCount(3)).toBe('Prestige 3');
    });

    test('formats session times', () => {
      expect(formatSessionTime(125000)).toBe('2m 5s');
    });

    test('formats upgrade keys as names', () => {
      expect(formatUpgradeName('AUTO_CLICK')).toBe('auto click');
    });

    test('formats critical click labels', () => {
      expect(formatCriticalLabel(true)).toBe('CRITICAL!');
    });

    test('returns empty critical labels for normal clicks', () => {
      expect(formatCriticalLabel(false)).toBe('');
    });

    test('formats boost time remaining labels', () => {
      expect(formatBoostTimeLeft(8)).toBe('8 blocks left');
    });

    test('formats leaderboard entries', () => {
      expect(formatLeaderboardEntry('SP123', 42)).toBe('SP123: 42');
    });

    test('formats click rate labels', () => {
      expect(formatClickRate(3.25)).toBe('3.3 clicks/s');
    });

    test('returns zero click rate for invalid values', () => {
      expect(formatClickRate(-1)).toBe('0.0 clicks/s');
    });

    test('formats block height labels', () => {
      expect(formatBlockHeight(42)).toBe('Block #42');
    });

    test('formats auto-clicker labels', () => {
      expect(formatAutoClicker(3)).toBe('3 auto-clickers');
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

    test('returns 0.00 STX for non-finite input', () => {
      expect(formatStx(undefined)).toBe('0.00 STX');
      expect(formatStx(Number.NaN)).toBe('0.00 STX');
    });

    test('handles zero value', () => {
      expect(formatStx(0)).toBe('0.00 STX');
    });

    test('handles numeric string micro-STX amounts', () => {
      expect(formatStx('1500000')).toBe('1.50 STX');
    });

    test('handles small micro-STX amounts', () => {
      expect(formatStx(1)).toBe('0.00 STX');
      expect(formatStx(99)).toBe('0.00 STX');
    });

    test('handles negative values gracefully', () => {
      expect(formatStx(-1000000)).toBe('-1.00 STX');
    });
  });

  describe('formatWalletShort', () => {
    test('returns trimmed value without ellipsis when short', () => {
      expect(formatWalletShort('  SP1234  ')).toBe('SP1234');
    });

    test('shortens long wallet labels', () => {
      expect(formatWalletShort('SP123456789')).toBe('SP123456...');
    });

    test('returns empty wallet labels for missing values', () => {
      expect(formatWalletShort(null)).toBe('');
    });
  });
});
