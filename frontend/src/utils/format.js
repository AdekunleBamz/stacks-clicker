/**
 * Utility functions for formatting strings, numbers, and blockchain data.
 */

/**
 * Truncates a Stacks address for display with flexible sizing.
 *
 * @param {string} address - The full Stacks address
 * @param {Object} [options] - Truncation options
 * @param {number} [options.prefix=4] - Chars to show at start
 * @param {number} [options.suffix=4] - Chars to show at end
 * @param {string} [options.separator='...'] - Chars to show in middle
 * @returns {string} The truncated address
 */
export function truncateAddress(address, { prefix = 4, suffix = 4, separator = '...' } = {}) {
  if (typeof address !== 'string' || address.trim().length === 0) return '';
  const normalizedAddress = address.trim();
  const safePrefix = Number.isFinite(prefix) ? Math.max(0, Math.trunc(prefix)) : 4;
  const safeSuffix = Number.isFinite(suffix) ? Math.max(0, Math.trunc(suffix)) : 4;
  if (safePrefix + safeSuffix === 0) return normalizedAddress;
  if (normalizedAddress.length <= safePrefix + safeSuffix) return normalizedAddress;
  return `${normalizedAddress.substring(0, safePrefix)}${separator}${normalizedAddress.substring(normalizedAddress.length - safeSuffix)}`;
}

/**
 * Formats a number as a human-readable currency or interaction count.
 *
 * @param {number} value - The numeric value to format
 * @param {Object} [options] - Intl.NumberFormat options
 * @returns {string} The formatted string
 */
export function formatNumber(value, options = {}) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return '0';
  return new Intl.NumberFormat('en-US', options).format(numericValue);
}

/**
 * Formats a STX micro-amount into a human-readable string.
 *
 * @param {number} microStx - The amount in micro-STX
 * @returns {string} The formatted STX amount
 */
export function formatStx(microStx) {
  const numericValue = Number(microStx);
  if (!Number.isFinite(numericValue)) return '0.00 STX';
  const stx = numericValue / 1_000_000;
  if (stx < 0) return `${(stx).toFixed(2)} STX`;
  return `${stx.toFixed(2)} STX`;
}

/**
 * Formats a large number with compact notation (e.g. 1.2K, 3.5M).
 *
 * @param {number} value - The number to format
 * @returns {string} Compact string representation
 */
export function formatCompact(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return '0';
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(numericValue);
}

/**
 * Formats a decimal as a percentage string.
 *
 * @param {number} value - The decimal value (e.g. 0.75 for 75%)
 * @param {number} [decimals=1] - Number of decimal places
 * @returns {string} Formatted percentage string
 */
export function formatPercent(value, decimals = 1) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return '0%';
  const safeDecimals = Number.isInteger(decimals) && decimals >= 0 ? decimals : 1;
  return (numericValue * 100).toFixed(safeDecimals) + '%';
}

/**
 * Formats a duration in milliseconds into a human-readable string.
 *
 * @param {number} ms - Duration in milliseconds
 * @returns {string} Formatted duration, e.g. "2m 30s" or "45s"
 */
export function formatDuration(ms) {
  const numericMs = Number(ms);
  if (!Number.isFinite(numericMs) || numericMs < 0) return '0s';
  const totalSeconds = Math.floor(numericMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes === 0) return `${seconds}s`;
  if (seconds === 0) return `${minutes}m`;
  return `${minutes}m ${seconds}s`;
}

/**
 * Formats a timestamp or epoch ms into a relative time string.
 *
 * @param {number} timestamp - The epoch timestamp in milliseconds
 * @param {number} [now=Date.now()] - Reference timestamp to compute relative to
 * @returns {string} Human-readable relative time, e.g. "2 minutes ago"
 */
export function formatRelativeTime(timestamp, now = Date.now()) {
  const diffMs = now - Number(timestamp);
  if (!Number.isFinite(diffMs)) return 'unknown';
  const diffSeconds = Math.floor(Math.abs(diffMs) / 1000);
  const isFuture = diffMs < 0;
  const suffix = isFuture ? 'from now' : 'ago';
  if (diffSeconds < 60) return `${diffSeconds}s ${suffix}`;
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ${suffix}`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ${suffix}`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ${suffix}`;
}

/**
 * Formats a number with an explicit sign prefix for delta values.
 *
 * @param {number} value - The numeric delta value
 * @param {number} [decimals=2] - Number of decimal places
 * @returns {string} Formatted string with sign, e.g. "+1.50" or "-0.30"
 */
export function formatSignedNumber(value, decimals = 2) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return '0';
  const safeDecimals = Number.isInteger(decimals) && decimals >= 0 ? decimals : 2;
  const formatted = Math.abs(numericValue).toFixed(safeDecimals);
  return numericValue >= 0 ? `+${formatted}` : `-${formatted}`;
}

/**
 * Formats a byte count into a human-readable size string.
 *
 * @param {number} bytes - The number of bytes
 * @param {number} [decimals=1] - Number of decimal places
 * @returns {string} Formatted size string, e.g. "1.5 KB"
 */
export function formatBytes(bytes, decimals = 1) {
  const numericBytes = Number(bytes);
  if (!Number.isFinite(numericBytes) || numericBytes < 0) return '0 B';
  if (numericBytes === 0) return '0 B';
  const safeDecimals = Number.isInteger(decimals) && decimals >= 0 ? decimals : 1;
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const index = Math.min(Math.floor(Math.log2(numericBytes) / 10), units.length - 1);
  const value = numericBytes / Math.pow(1024, index);
  return `${value.toFixed(safeDecimals)} ${units[index]}`;
}

export const formatClickCount = (n) => Number(n).toLocaleString();

/**
 * Truncates a transaction ID for display while preserving start and end for verification.
 *
 * @param {string} txId - The full transaction ID (256-character hex string)
 * @param {Object} [options] - Truncation options
 * @param {number} [options.prefix=8] - Characters to show at start
 * @param {number} [options.suffix=8] - Characters to show at end
 * @returns {string} Truncated transaction ID, e.g. "a1b2c3d4...x5y6z7w8"
 */
export function formatTransactionId(txId, { prefix = 8, suffix = 8 } = {}) {
  if (typeof txId !== 'string' || txId.length === 0) return '';
  const normalizedTxId = txId.trim().toLowerCase();
  const safePrefix = Number.isFinite(prefix) ? Math.max(0, Math.trunc(prefix)) : 8;
  const safeSuffix = Number.isFinite(suffix) ? Math.max(0, Math.trunc(suffix)) : 8;
  if (safePrefix + safeSuffix === 0) return normalizedTxId;
  if (normalizedTxId.length <= safePrefix + safeSuffix) return normalizedTxId;
  return `${normalizedTxId.substring(0, safePrefix)}...${normalizedTxId.substring(normalizedTxId.length - safeSuffix)}`;
}

/**
 * Formats a countdown delay in milliseconds with precision control for UI display.
 *
 * @param {number} ms - Delay in milliseconds
 * @param {Object} [options] - Formatting options
 * @param {boolean} [options.showMs=false] - Include milliseconds (only if under 1 second)
 * @param {number} [options.maxUnits=2] - Maximum number of time units to show
 * @returns {string} Formatted countdown, e.g. "1m 30s" or "500ms"
 */
export function formatCountdown(ms, { showMs = false, maxUnits = 2 } = {}) {
  const numericMs = Number(ms);
  if (!Number.isFinite(numericMs) || numericMs < 0) return '0s';
  
  if (numericMs < 1000 && showMs) {
    return `${Math.ceil(numericMs)}ms`;
  }
  
  const totalSeconds = Math.floor(numericMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const seconds = totalSeconds % 60;
  const unitCount = Math.max(1, Math.trunc(maxUnits));
  
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours % 24 > 0) parts.push(`${hours % 24}h`);
  if (minutes % 60 > 0) parts.push(`${minutes % 60}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);
  
  return parts.slice(0, unitCount).join(' ');
}

export const formatScore = (n) => Number(n).toFixed(2);

export const formatUpgradeLevel = (lvl) => "Level " + lvl;

export const formatMultiplier = (m) => m + "x";

export const formatCost = (n) => Number(n).toLocaleString() + " pts";

export const formatRank = (n) => "#" + n;

export const formatBoostName = (name) => name.charAt(0).toUpperCase() + name.slice(1);

export const formatCombo = (n) => n + "x combo";

export const formatPrestigeCount = (n) => "Prestige " + n;

export const formatSessionTime = (ms) => Math.floor(ms / 60000) + "m " + Math.floor((ms % 60000) / 1000) + "s";

export const formatClickRate = (cps) => Number(cps).toFixed(1) + " clicks/s";

export const formatLevel = (lvl) => "Lv." + Math.max(0, Math.floor(Number(lvl)));

export const formatPlayerTag = (id) => "Player #" + Number(id);

export const formatUpgradeName = (key) => key.replace(/_/g, " ").toLowerCase();

export const formatCriticalLabel = (isCrit) => isCrit ? "CRITICAL!" : "";

export const formatBoostTimeLeft = (blocks) => blocks + " blocks left";

export const formatLeaderboardEntry = (addr, score) => addr + ": " + score;

export const formatClickRate = (cps) => {
  const numericCps = Number(cps);
  if (!Number.isFinite(numericCps) || numericCps < 0) return '0.0 clicks/s';
  return numericCps.toFixed(1) + ' clicks/s';
};

export const formatWalletShort = (addr) => {
  const normalized = typeof addr === 'string' ? addr.trim() : '';
  if (!normalized) return '';
  if (normalized.length <= 8) return normalized;
  return normalized.slice(0, 8) + '...';
};

export const formatBlockHeight = (h) => "Block #" + h;

export const formatAutoClicker = (n) => n + " auto-clickers";
