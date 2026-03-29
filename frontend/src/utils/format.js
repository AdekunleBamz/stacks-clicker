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
  if (address.length <= prefix + suffix + separator.length) return address;
  return `${address.substring(0, prefix)}${separator}${address.substring(address.length - suffix)}`;
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
  return (microStx / 1000000).toFixed(2) + ' STX';
}
