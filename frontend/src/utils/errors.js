/**
 * Utility for parsing Stacks smart contract error codes into human-readable messages.
 * 
 * Stacks errors are typically returned as strings like "(err u101)" or "101".
 * This module maps these numeric codes to friendly feedback for the user.
 *
 * @module utils/errors
 */

const ERROR_MAP = {
  // Common Stacks / Contract Errors
  '100': 'Unauthorized: You do not have permission to perform this action.',
  '101': 'Insufficient Funds: You do not have enough STX to complete this transaction.',
  '102': 'Invalid Parameters: The data provided to the contract is malformed.',
  '103': 'Cooldown Active: Please wait before performing this action again.',
  '104': 'Limit Reached: You have reached the maximum allowed for this interaction.',
  '105': 'Poll Expired: This poll is no longer accepting votes.',
  '106': 'Already Voted: You have already cast your vote in this poll.',
  '401': 'User Rejected: The transaction request was cancelled in your wallet.',
  '403': 'Contract Paused: This interaction is currently disabled by the maintainers.',
  '500': 'Network Error: Failed to broadcast the transaction. Please try again.',
  '1001': 'Invalid Amount: Please specify a positive number for this interaction.',
};

/**
 * Parses a raw error from the Stacks blockchain or wallet provider.
 * 
 * @param {any} error - The error object or string to parse
 * @returns {string} A user-friendly error message
 */
export function parseContractError(error) {
  const errorMessage =
    typeof error === 'string'
      ? error
      : error?.message || error?.reason || error?.error || String(error);
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
  if (lowerMessage.includes('user rejected')) {
    return ERROR_MAP['401'];
  }

  if (lowerMessage.includes('insufficient')) {
    return ERROR_MAP['101'];
  }

  const compactMessage = errorMessage.length > 60 ? `${errorMessage.slice(0, 60)}...` : errorMessage;
  return `Transaction failed: ${compactMessage}`;
}
