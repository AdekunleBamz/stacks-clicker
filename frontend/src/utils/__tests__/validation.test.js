import { describe, it, expect } from 'vitest';
import {
  isPositiveInteger,
  isNonEmptyString,
  isValidMicroStxAmount,
  isValidTipAmount,
  isValidPollOptionId,
  isValidStacksAddress,
  isValidWalletAddress,
  validatePayload,
  SCHEMAS,
  isValidClickCount,
  isValidUpgradeLevel,
  isValidScore,
  isValidMultiplier,
  isValidBoostDuration,
  isValidComboCount,
  isValidPrestigeCount,
  isValidClickRate,
  isValidSessionDuration,
  isValidLeaderboardRank,
  isValidAutoClickerCount,
  isValidUpgradeCost,
  isValidClickReward,
  isValidCriticalChance,
  isValidUsername,
  isValidPage,
  isValidPageSize,
  isValidBoostType,
  isValidUpgradeType,
  isValidRetryAttempts,
  isValidCacheAge,
  isValidPrestigeMultiplier,
  isValidBoostLevel,
  isValidPollTitle,
  isValidNotificationId,
  isValidGameVersion,
  isValidUpgradeSlot,
  isValidWalletBalance,
  isValidMinClickAmount,
} from '../validation';

describe('isValidStacksAddress', () => {
  it('should return true for valid mainnet addresses', () => {
    expect(isValidStacksAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT')).toBe(true);
  });

  it('should trim addresses before validation', () => {
    expect(isValidStacksAddress('  SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT  ')).toBe(true);
  });

  it('should return true for valid testnet addresses', () => {
    expect(isValidStacksAddress('ST5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT')).toBe(true);
  });

  it('should return false for invalid addresses', () => {
    expect(isValidStacksAddress('invalid-address')).toBe(false);
    expect(isValidStacksAddress('')).toBe(false);
    expect(isValidStacksAddress(null)).toBe(false);
    expect(isValidStacksAddress(undefined)).toBe(false);
  });

  it('should return false for addresses with wrong prefix', () => {
    expect(isValidStacksAddress('AB5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT')).toBe(false);
  });

  it('should return false for addresses with incorrect length', () => {
    expect(isValidStacksAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9')).toBe(false);
    expect(isValidStacksAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJTX')).toBe(false);
  });

  it('should return false for addresses with lowercase characters', () => {
    expect(isValidStacksAddress('sp5k2rhmsbh4pap4pgx77mcvnk1zeed07cwx9tjt')).toBe(false);
  });

  it('should return false for addresses with disallowed characters', () => {
    expect(isValidStacksAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TIO')).toBe(false);
  });
});

describe('validatePayload', () => {
  it('should return true for valid payload', () => {
    const payload = { amount: 10 };
    expect(validatePayload(payload, SCHEMAS.CLICK)).toBe(true);
  });

  it('should validate complete tip payloads', () => {
    const payload = { amount: 100, recipient: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT' };
    expect(validatePayload(payload, SCHEMAS.TIP)).toBe(true);
  });

  it('should validate poll payloads', () => {
    const payload = { optionId: 0, pollId: 2 };
    expect(validatePayload(payload, SCHEMAS.POLL)).toBe(true);
  });

  it('should throw for invalid payload', () => {
    const payload = { amount: -1 };
    expect(() => validatePayload(payload, SCHEMAS.CLICK)).toThrow();
  });

  it('should include invalid field names in payload errors', () => {
    expect(() => validatePayload({ amount: -1 }, SCHEMAS.CLICK)).toThrow('"amount"');
  });

  it('should include recipient field names when tip recipient validation fails', () => {
    expect(() =>
      validatePayload({ amount: 100, recipient: 'SP123' }, SCHEMAS.TIP),
    ).toThrow('"recipient"');
  });

  it('should throw for missing required fields', () => {
    const payload = {};
    expect(() => validatePayload(payload, SCHEMAS.CLICK)).toThrow();
  });

  it('should throw for non-object payloads', () => {
    expect(() => validatePayload(null, SCHEMAS.CLICK)).toThrow();
    expect(() => validatePayload('string', SCHEMAS.CLICK)).toThrow();
    expect(() => validatePayload(123, SCHEMAS.CLICK)).toThrow();
  });

  it('should throw for non-object schemas', () => {
    expect(() => validatePayload({ amount: 1 }, null)).toThrow('schema must be an object');
  });

  it('should throw when schema entries are not validators', () => {
    expect(() => validatePayload({ amount: 1 }, { amount: true })).toThrow('not a validator function');
  });
});

describe('numeric helpers', () => {
  it('validates non-empty strings after trimming', () => {
    expect(isNonEmptyString(' player ')).toBe(true);
    expect(isNonEmptyString('   ')).toBe(false);
  });

  it('rejects non-string values for non-empty string checks', () => {
    expect(isNonEmptyString(42)).toBe(false);
  });

  it('accepts numeric strings for integer checks', () => {
    expect(isPositiveInteger('2')).toBe(true);
    expect(isPositiveInteger('0')).toBe(false);
  });

  it('rejects fractional positive integer values', () => {
    expect(isPositiveInteger(1.5)).toBe(false);
  });

  it('accepts numeric strings for micro-STX amounts', () => {
    expect(isValidMicroStxAmount('25')).toBe(true);
    expect(isValidMicroStxAmount('-1')).toBe(false);
  });

  it('rejects fractional micro-STX amounts', () => {
    expect(isValidMicroStxAmount(1.5)).toBe(false);
  });

  it('validates tip amounts against the minimum', () => {
    expect(isValidTipAmount(100)).toBe(true);
    expect(isValidTipAmount(99)).toBe(false);
  });

  it('accepts numeric-string tip amounts at the minimum', () => {
    expect(isValidTipAmount('100')).toBe(true);
  });

  it('rejects non-finite tip amounts', () => {
    expect(isValidTipAmount(Number.POSITIVE_INFINITY)).toBe(false);
  });

  it('validates poll option ids with explicit bounds', () => {
    expect(isValidPollOptionId('2', 4)).toBe(true);
    expect(isValidPollOptionId('4', 4)).toBe(false);
  });

  it('rejects negative poll option ids', () => {
    expect(isValidPollOptionId(-1, 4)).toBe(false);
  });

  it('uses default poll option bounds', () => {
    expect(isValidPollOptionId(3)).toBe(true);
  });

  it('rejects poll option checks with invalid bounds', () => {
    expect(isValidPollOptionId(0, 0)).toBe(false);
  });

  it('uses full Stacks address validation for wallet addresses', () => {
    expect(isValidWalletAddress('SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT')).toBe(true);
    expect(isValidWalletAddress('SP123')).toBe(false);
  });

  it('accepts wallet addresses with surrounding whitespace', () => {
    expect(isValidWalletAddress('  SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT  ')).toBe(true);
  });

  it('validates non-negative click counts', () => {
    expect(isValidClickCount(0)).toBe(true);
    expect(isValidClickCount(-1)).toBe(false);
  });

  it('validates upgrade level bounds', () => {
    expect(isValidUpgradeLevel(50)).toBe(true);
    expect(isValidUpgradeLevel(51)).toBe(false);
  });

  it('validates non-negative scores', () => {
    expect(isValidScore('10')).toBe(true);
    expect(isValidScore(-0.1)).toBe(false);
  });

  it('validates multiplier minimums', () => {
    expect(isValidMultiplier(1)).toBe(true);
    expect(isValidMultiplier(0.5)).toBe(false);
  });

  it('validates boost durations as positive integers', () => {
    expect(isValidBoostDuration(5)).toBe(true);
    expect(isValidBoostDuration(0)).toBe(false);
  });

  it('validates combo counts as non-negative integers', () => {
    expect(isValidComboCount(0)).toBe(true);
    expect(isValidComboCount(1.5)).toBe(false);
  });

  it('validates prestige counts as non-negative integers', () => {
    expect(isValidPrestigeCount('2')).toBe(true);
    expect(isValidPrestigeCount(-1)).toBe(false);
  });

  it('validates click rates as non-negative numbers', () => {
    expect(isValidClickRate(0.5)).toBe(true);
    expect(isValidClickRate(Number.NaN)).toBe(false);
  });

  it('validates session durations as non-negative numbers', () => {
    expect(isValidSessionDuration(0)).toBe(true);
    expect(isValidSessionDuration(-10)).toBe(false);
  });

  it('validates leaderboard ranks from one upward', () => {
    expect(isValidLeaderboardRank(1)).toBe(true);
    expect(isValidLeaderboardRank(0)).toBe(false);
  });

  it('validates auto-clicker counts as non-negative integers', () => {
    expect(isValidAutoClickerCount(2)).toBe(true);
    expect(isValidAutoClickerCount(2.5)).toBe(false);
  });

  it('validates upgrade costs as positive numbers', () => {
    expect(isValidUpgradeCost(10)).toBe(true);
    expect(isValidUpgradeCost(0)).toBe(false);
  });

  it('validates click rewards as positive numbers', () => {
    expect(isValidClickReward(1)).toBe(true);
    expect(isValidClickReward(-1)).toBe(false);
  });

  it('validates critical chance bounds', () => {
    expect(isValidCriticalChance(1)).toBe(true);
    expect(isValidCriticalChance(1.1)).toBe(false);
  });

  it('validates username length after trimming', () => {
    expect(isValidUsername(' ace ')).toBe(true);
    expect(isValidUsername('xy')).toBe(false);
  });

  it('rejects usernames above the maximum length', () => {
    expect(isValidUsername('x'.repeat(33))).toBe(false);
  });

  it('validates page numbers from one upward', () => {
    expect(isValidPage(1)).toBe(true);
    expect(isValidPage(0)).toBe(false);
  });

  it('validates page size upper bounds', () => {
    expect(isValidPageSize(100)).toBe(true);
    expect(isValidPageSize(101)).toBe(false);
  });

  it('rejects zero page sizes', () => {
    expect(isValidPageSize(0)).toBe(false);
  });

  it('validates supported boost types', () => {
    expect(isValidBoostType('combo')).toBe(true);
    expect(isValidBoostType('luck')).toBe(false);
  });

  it('accepts auto boost types', () => {
    expect(isValidBoostType('auto')).toBe(true);
  });

  it('validates supported upgrade types', () => {
    expect(isValidUpgradeType('crit')).toBe(true);
    expect(isValidUpgradeType('range')).toBe(false);
  });

  it('accepts damage upgrade types', () => {
    expect(isValidUpgradeType('damage')).toBe(true);
  });

  it('validates retry attempt bounds', () => {
    expect(isValidRetryAttempts(3)).toBe(true);
    expect(isValidRetryAttempts(4)).toBe(false);
  });

  it('validates cache age limits', () => {
    expect(isValidCacheAge(1000)).toBe(true);
    expect(isValidCacheAge(900001)).toBe(false);
  });

  it('validates prestige multiplier minimum', () => {
    expect(isValidPrestigeMultiplier(1)).toBe(true);
    expect(isValidPrestigeMultiplier(0.99)).toBe(false);
  });

  it('validates boost level caps', () => {
    expect(isValidBoostLevel(5)).toBe(true);
    expect(isValidBoostLevel(6)).toBe(false);
  });

  it('validates poll title max length', () => {
    expect(isValidPollTitle('A'.repeat(120))).toBe(true);
    expect(isValidPollTitle('B'.repeat(121))).toBe(false);
  });

  it('accepts numeric notification identifiers', () => {
    expect(isValidNotificationId(42)).toBe(true);
  });

  it('validates semantic game versions', () => {
    expect(isValidGameVersion('1.2.3')).toBe(true);
    expect(isValidGameVersion('1.2')).toBe(false);
  });

  it('validates upgrade slot upper bound', () => {
    expect(isValidUpgradeSlot(49)).toBe(true);
    expect(isValidUpgradeSlot(50)).toBe(false);
  });

  it('validates wallet balance finiteness and sign', () => {
    expect(isValidWalletBalance(0)).toBe(true);
    expect(isValidWalletBalance(Number.POSITIVE_INFINITY)).toBe(false);
  });

  it('validates minimum click amount positivity', () => {
    expect(isValidMinClickAmount(0.01)).toBe(true);
    expect(isValidMinClickAmount(0)).toBe(false);
  });

  it('accepts numeric-string retry attempts within range', () => {
    expect(isValidRetryAttempts('2')).toBe(true);
  });

  it('rejects NaN cache ages', () => {
    expect(isValidCacheAge(Number.NaN)).toBe(false);
  });

  it('rejects fractional boost levels', () => {
    expect(isValidBoostLevel(2.5)).toBe(false);
  });

  it('rejects blank poll titles', () => {
    expect(isValidPollTitle('   ')).toBe(false);
  });

  it('rejects empty notification identifiers', () => {
    expect(isValidNotificationId('   ')).toBe(false);
  });

  it('accepts trimmed semantic game versions', () => {
    expect(isValidGameVersion(' 2.0.1 ')).toBe(true);
  });

  it('accepts numeric-string wallet balances', () => {
    expect(isValidWalletBalance('10.5')).toBe(true);
  });

  it('rejects zero as minimum click amount string', () => {
    expect(isValidMinClickAmount('0')).toBe(false);
  });

  it('rejects negative retry attempts', () => {
    expect(isValidRetryAttempts(-1)).toBe(false);
  });

  it('accepts cache age at upper bound', () => {
    expect(isValidCacheAge(900000)).toBe(true);
  });

  it('rejects non-numeric prestige multipliers', () => {
    expect(isValidPrestigeMultiplier('abc')).toBe(false);
  });

  it('accepts zero boost level', () => {
    expect(isValidBoostLevel(0)).toBe(true);
  });

  it('accepts trimmed poll titles within limits', () => {
    expect(isValidPollTitle('  launch now  ')).toBe(true);
  });

  it('rejects prefixed semantic versions', () => {
    expect(isValidGameVersion('v1.2.3')).toBe(false);
  });

  it('rejects negative upgrade slots', () => {
    expect(isValidUpgradeSlot(-1)).toBe(false);
  });

  it('rejects negative wallet balances provided as strings', () => {
    expect(isValidWalletBalance('-1')).toBe(false);
  });

  it('rejects negative minimum click amounts', () => {
    expect(isValidMinClickAmount(-0.1)).toBe(false);
  });

  it('rejects cache age strings above the maximum', () => {
    expect(isValidCacheAge('900001')).toBe(false);
  });
});
