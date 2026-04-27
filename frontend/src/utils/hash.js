/**
 * Simple hashing utility for deterministic ID generation and visualization.
 */

/**
 * Generates a simple DJB2 hash of a string.
 * Useful for mapping transaction IDs to colors or icons deterministically.
 * 
 * @param {string} str - String to hash
 * @returns {number} 32-bit hash value
 */
export function simpleHash(str) {
  if (!str || typeof str !== 'string') return 0;
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0;
}

/**
 * Generates a deterministic HSL color from a string hash.
 * 
 * @param {string} str - String to colorize
 * @returns {string} HSL color string
 */
export function stringToColor(str) {
  const hash = simpleHash(str);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 65%)`;
}

  /**
   * Maps a string hash to an array index deterministically.
   *
   * @param {string} str - String to hash
   * @param {number} length - Length of the target array
   * @returns {number} A valid index in range [0, length)
   */
  export function hashToIndex(str, length) {
    if (!length || length <= 0) return 0;
    return simpleHash(str) % length;
  }
