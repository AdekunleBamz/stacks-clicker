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

/**
 * Returns a short hex substring of a string's hash, useful for display IDs.
 *
 * @param {string} str - Input string
 * @param {number} [len=8] - Desired output length (1-16)
 * @returns {string} Short hex digest
 */
export function shortHash(str, len = 8) {
  const safeLen = Math.min(16, Math.max(1, Math.trunc(Number(len)) || 8));
  return simpleHash(str).toString(16).padStart(8, '0').slice(0, safeLen);
}

/**
 * Finds the most frequently occurring hash value in an array of strings.
 * Useful for statistical analysis of distributed transaction types.
 *
 * @param {string[]} strings - Array of strings to hash
 * @returns {number|null} Most common hash value, or null if array is empty
 */
export function getMostFrequentHash(strings) {
  if (!Array.isArray(strings) || strings.length === 0) return null;
  
  const hashCounts = {};
  let maxHash = null;
  let maxCount = 0;
  
  for (const str of strings) {
    const hash = simpleHash(str);
    hashCounts[hash] = (hashCounts[hash] || 0) + 1;
    
    if (hashCounts[hash] > maxCount) {
      maxCount = hashCounts[hash];
      maxHash = hash;
    }
  }
  
  return maxHash;
}
