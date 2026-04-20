/**
 * Utility for parsing Stacks smart contract error codes into human-readable messages.
 *
 * Stacks errors are typically returned as strings like "(err u101)" or "101".
 * This module maps these numeric codes to friendly feedback for the user.
 *
 * @module utils/errors
 */

const ERROR_MAP = Object.freeze({
  // Common Stacks / Contract Errors
  '100': 'Unauthorized: You do not have permission to perform this action.',
  '101': 'Insufficient Funds: You do not have enough STX to complete this transaction.',
  '102': 'Invalid Parameters: The data provided to the contract is malformed.',
  '103': 'Cooldown Active: Please wait before performing this action again.',
  '104': 'Limit Reached: You have reached the maximum allowed for this interaction.',
  '105': 'Already Voted: You have already submitted a vote for this poll.',
  '106': 'Not Found: The requested contract or resource could not be found.',
  '107': 'Poll Closed: Voting for this poll has ended.',
  '401': 'User Rejected: The transaction request was cancelled in your wallet.',
  '403': 'Contract Paused: This interaction is currently disabled by the maintainers.',
  '408': 'Request Timeout: The transaction request timed out. Please retry.',
  '500': 'Network Error: Failed to broadcast the transaction. Please try again.',
});

/**
 * Parses a raw error from the Stacks blockchain or wallet provider.
 *
 * @param {any} error - The error object or string to parse
 * @returns {string} A user-friendly error message
 */
export function parseContractError(error) {
  if (!error) return 'Transaction failed: an unknown error occurred.';
  const errorMessage =
    typeof error === 'string'
      ? error
      : error?.message
        || error?.reason
        || error?.error?.message
        || error?.error?.reason
        || error?.error
        || String(error);
  const lowerMessage = errorMessage.toLowerCase();

  // Extract numeric codes from strings like "(err u101)" or "Error: 101"
  const match = errorMessage.match(/\d+/);
  const code = match ? match[0] : null;

  if (code && ERROR_MAP[code]) {
    return ERROR_MAP[code];
  }

  if (
    lowerMessage.includes('backoff active') ||
    lowerMessage.includes('rate limit') ||
    lowerMessage.includes('quota') ||
    lowerMessage.includes('toomuchchaining')
  ) {
    return errorMessage;
  }

  // Handle common string-based patterns
  if (lowerMessage.includes('user rejected') || lowerMessage.includes('cancelled')) {
    return ERROR_MAP['401'];
  }

  if (lowerMessage.includes('insufficient')) {
    return ERROR_MAP['101'];
  }

  const compactMessage = errorMessage.length > 60 ? `${errorMessage.slice(0, 60)}...` : errorMessage;
  return `Transaction failed: ${compactMessage}`;
}

/** Alias for parseContractError for callers preferring a more generic name */
export const getErrorMessage = parseContractError;
