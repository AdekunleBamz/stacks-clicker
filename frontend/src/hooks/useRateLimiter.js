import { useRef, useCallback, useState, useEffect } from 'react';

/**
 * Custom hook for rate limiting function calls.
 * Prevents spam clicks and excessive API calls by enforcing a minimum
 * time interval between function executions.
 *
 * @param {Object} options - Configuration options
 * @param {number} [options.interval=1000] - Minimum time in ms between allowed calls
 * @param {Function} [options.onRejected] - Callback when a call is rejected due to rate limiting
 * @returns {Object} Rate limiter controls
 * @returns {Function} return.withRateLimit - Wraps a function to apply rate limiting
 * @returns {boolean} return.isLimited - Whether the current call is being rate limited
 * @returns {number} return.remainingMs - Milliseconds until the next allowed call
 * @returns {Function} return.reset - Reset the rate limiter
 *
 * @example
 * ```jsx
 * const { withRateLimit, isLimited, remainingMs } = useRateLimiter({
 *   interval: 2000,
 *   onRejected: () => notify.error('Please wait before clicking again')
 * });
 *
 * const handleClick = withRateLimit(() => {
 *   // This will only execute if enough time has passed
 *   submitTransaction();
 * });
 *
 * return (
 *   <button onClick={handleClick} disabled={isLimited}>
 *     Click me {isLimited && `(${remainingMs}ms)`}
 *   </button>
 * );
 * ```
 */
export function useRateLimiter(options = {}) {
  const { interval = 1000, onRejected } = options;
  const lastCallTimeRef = useRef(0);
  const timeoutRef = useRef(null);
  const [, forceUpdate] = useState({});

  /**
   * Check if enough time has passed since the last call
   */
  const canCall = useCallback(() => {
    const now = Date.now();
    return now - lastCallTimeRef.current >= interval;
  }, [interval]);

  /**
   * Get remaining milliseconds until next allowed call
   */
  const getRemainingMs = useCallback(() => {
    const now = Date.now();
    const elapsed = now - lastCallTimeRef.current;
    return Math.max(0, interval - elapsed);
  }, [interval]);

  /**
   * Wrap a function to apply rate limiting
   */
  const withRateLimit = useCallback(
    (fn) => {
      return (...args) => {
        if (!canCall()) {
          onRejected?.();
          return false;
        }

        lastCallTimeRef.current = Date.now();
        const result = fn(...args);

        // Force re-render to update isLimited state
        forceUpdate({});

        // Clear previous timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Set timeout to update state when rate limit expires
        timeoutRef.current = setTimeout(() => {
          forceUpdate({});
          timeoutRef.current = null;
        }, interval);

        return result;
      };
    },
    [canCall, onRejected, interval]
  );

  /**
   * Reset the rate limiter
   */
  const reset = useCallback(() => {
    lastCallTimeRef.current = 0;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    forceUpdate({});
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    withRateLimit,
    isLimited: !canCall(),
    remainingMs: getRemainingMs(),
    reset,
  };
}

export default useRateLimiter;
