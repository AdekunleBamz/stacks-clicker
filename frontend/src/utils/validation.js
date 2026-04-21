/**
 * Simple type-checking and validation utility for interaction payloads.
 * Ensures that data sent to smart contract hooks conforms to expected formats.
 *
 * @module utils/validation
 */

import { MIN_TIP_MICRO_STX } from './constants';

/**
 * Validates a Stacks address format.
 * @param {string} address - The address to validate
 * @returns {boolean} True if the address is valid
 */
export function isValidStacksAddress(address) {
  if (!address || typeof address !== 'string') return false;
  return /^S[PT][0123456789ABCDEFGHJKMNPQRSTVWXYZ]{38}$/.test(address.trim());
}

/**
 * Returns true if the value is a non-empty string.
 * @param {*} value
 * @returns {boolean}
 */
export function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Returns true if the value is a positive integer greater than zero.
 * @param {*} value
 * @returns {boolean}
 */
export function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

/**
 * Returns true if the amount is a valid micro-STX value (non-negative finite integer).
 * @param {*} value
 * @returns {boolean}
 */
export function isValidMicroStxAmount(value) {
  return Number.isInteger(value) && value >= 0;
}

/**
 * Returns true if the tip amount meets the minimum threshold.
 * @param {*} value
 * @returns {boolean}
 */
export function isValidTipAmount(value) {
  return Number.isFinite(Number(value)) && Number(value) >= MIN_TIP_MICRO_STX;
}

/**
 * Returns true if the given poll option ID is a non-negative integer within bounds.
 * @param {*} value - The option index to validate
 * @param {number} [maxOptions=4] - Maximum number of allowed options (exclusive upper bound)
 * @returns {boolean}
 */
export function isValidPollOptionId(value, maxOptions = 4) {
  return Number.isInteger(value) && value >= 0 && value < maxOptions;
}

export const SCHEMAS = Object.freeze({
  CLICK: {
    amount: (val) => Number.isFinite(val) && val > 0,
  },
  TIP: {
    amount: (val) => Number.isFinite(val) && val >= MIN_TIP_MICRO_STX,
    recipient: (val) => isValidStacksAddress(val),
  },
  POLL: {
    optionId: (val) => Number.isInteger(val) && val >= 0,
    pollId: (val) => Number.isInteger(val) && val >= 0,
  },
});

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
        throw new Error(`Validation failed: "${key}" received invalid value (${JSON.stringify(payload[key])})`);
      }
    }
  }
  return true;
}

export const isValidClickCount = (v) => Number.isInteger(Number(v)) && Number(v) >= 0;

export const isValidUpgradeLevel = (v) => Number.isInteger(Number(v)) && Number(v) >= 0 && Number(v) <= 50;

export const isValidScore = (v) => !isNaN(Number(v)) && Number(v) >= 0;

export const isValidMultiplier = (v) => !isNaN(Number(v)) && Number(v) >= 1;
