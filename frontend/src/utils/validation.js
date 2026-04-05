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
