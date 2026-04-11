/**
 * Simple type-checking and validation utility for interaction payloads.
 * Ensures that data sent to smart contract hooks conforms to expected formats.
 *
 * @module utils/validation
 */

/**
 * Validates a Stacks address format.
 * @param {string} address - The address to validate
 * @returns {boolean} True if the address is valid
 */
export function isValidStacksAddress(address) {
  if (!address || typeof address !== 'string') return false;
  return /^S[PT][0123456789ABCDEFGHJKMNPQRSTVWXYZ]{38}$/.test(address);
}

export const SCHEMAS = {
  CLICK: {
    amount: (val) => Number.isFinite(val) && val > 0,
  },
  TIP: {
    amount: (val) => Number.isFinite(val) && val >= 100,
    recipient: (val) => isValidStacksAddress(val),
  },
  POLL: {
    optionId: (val) => Number.isInteger(val) && val >= 0,
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
  if (!payload || typeof payload !== 'object') {
    throw new Error('Validation failed: payload must be an object');
  }
  if (!schema || typeof schema !== 'object') {
    throw new Error('Validation failed: schema must be an object');
  }

  for (const key in schema) {
    if (Object.prototype.hasOwnProperty.call(schema, key)) {
      if (typeof schema[key] !== 'function') {
        throw new Error(`Validation failed: schema key "${key}" is not a validator function`);
      }
      const isValid = schema[key](payload[key]);
      if (!isValid) {
        throw new Error(`Validation failed for key: ${key}. Value: ${payload[key]}`);
      }
    }
  }
  return true;
}
