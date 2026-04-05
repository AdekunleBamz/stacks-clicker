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
  if (address.length <= safePrefix + safeSuffix + separator.length) return address;
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
  if (typeof value === 'bigint') {
    return new Intl.NumberFormat('en-US', options).format(value);
  }

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
  if (typeof microStx === 'bigint') {
    const isNegative = microStx < 0n;
    const absolute = isNegative ? -microStx : microStx;
    const roundedCentiStx = (absolute + 5000n) / 10000n;
    const whole = roundedCentiStx / 100n;
    const fraction = (roundedCentiStx % 100n).toString().padStart(2, '0');
    const sign = isNegative ? '-' : '';
    return `${sign}${new Intl.NumberFormat('en-US').format(whole)}.${fraction} STX`;
  }

  const numericValue = Number(microStx);
  if (!Number.isFinite(numericValue)) return '0.00 STX';
  return (numericValue / 1000000).toFixed(2) + ' STX';
}
