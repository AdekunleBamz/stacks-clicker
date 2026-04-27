/**
 * Simple type-checking and validation utility for interaction payloads.
 * Ensures that data sent to smart contract hooks conforms to expected formats.
 *
 * @module utils/validation
 */

export const SCHEMAS = {
  CLICK: {
    amount: (val) => typeof val === 'number' && val > 0,
  },
  TIP: {
    amount: (val) => typeof val === 'number' && val >= 100,
    recipient: (val) => typeof val === 'string' && val.startsWith('SP'),
  },
  POLL: {
    optionId: (val) => typeof val === 'number' && val >= 0,
  },
};

/**
 * Validates a payload against a pre-defined schema.
 *
 * @param {Object} payload - The data to validate
 * @param {Object} schema - The schema mapping keys to validation functions
 * @throws {Error} If validation fails
 */
export function validatePayload(payload, schema) {
  for (const key in schema) {
    if (Object.prototype.hasOwnProperty.call(schema, key)) {
      const isValid = schema[key](payload[key]);
      if (!isValid) {
        throw new Error(`Validation failed for key: ${key}. Value: ${payload[key]}`);
      }
    }
  }
  return true;
}

/**
 * Returns true if the value looks like a valid Stacks mainnet address (SP…).
 *
 * @param {string} value - The address string to test
 * @returns {boolean}
 */
export function isStacksAddress(value) {
  return typeof value === 'string' && /^SP[0-9A-Z]{28,41}$/.test(value);
}

  /**
   * Returns true if the value is a positive integer (> 0).
   *
   * @param {any} value - The value to test
   * @returns {boolean}
   */
  export function isPositiveInteger(value) {
    return Number.isInteger(value) && value > 0;
  }

/**
 * Returns true if value is a non-empty string after trimming.
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Returns true if value is a valid positive number (not including 0).
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isPositiveNumber(value) {
  return typeof value === 'number' && isFinite(value) && value > 0;
}

/**
 * Returns true if value is a valid non-negative number (including 0).
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isNonNegativeNumber(value) {
  return typeof value === 'number' && isFinite(value) && value >= 0;
}
