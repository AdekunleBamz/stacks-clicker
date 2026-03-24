/**
 * Utility functions for formatting strings, numbers, and blockchain data.
 */

/**
 * Truncates a Stacks address for display.
 * 
 * @param {string} address - The full Stacks address
 * @param {number} [chars=4] - Number of characters to show at start and end
 * @returns {string} The truncated address (e.g., 'SP2F...3H7K')
 */
export function truncateAddress(address, chars = 4) {
  if (!address) return '';
  if (address.length <= chars * 2 + 2) return address;
  return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`;
}

/**
 * Formats a number as a human-readable currency or interaction count.
 * 
 * @param {number} value - The numeric value to format
 * @param {Object} [options] - Intl.NumberFormat options
 * @returns {string} The formatted string
 */
export function formatNumber(value, options = {}) {
  return new Intl.NumberFormat('en-US', options).format(value);
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
