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
  if (!address) return '';
  const safePrefix = Number.isFinite(prefix) ? Math.max(0, Math.trunc(prefix)) : 4;
  const safeSuffix = Number.isFinite(suffix) ? Math.max(0, Math.trunc(suffix)) : 4;
  if (safePrefix + safeSuffix === 0) return address;
  if (address.length <= safePrefix + safeSuffix) return address;
  return `${address.substring(0, safePrefix)}${separator}${address.substring(address.length - safeSuffix)}`;
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
  const sign = stx < 0 ? '-' : '';
  return `${sign}${Math.abs(stx).toFixed(2)} STX`;
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
  return (numericValue * 100).toFixed(decimals) + '%';
}
