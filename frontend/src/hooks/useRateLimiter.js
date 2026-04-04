import { useRef, useCallback, useEffect, useState } from 'react';

/**
 * Custom hook for rate limiting function calls.
 * Prevents rapid repeated actions by enforcing a minimum time interval
 * between successful executions.
 *
 * @param {Object} options - Configuration options
 * @param {number} [options.interval=1000] - Minimum milliseconds between allowed calls
 * @param {Function} [options.onRejected] - Callback invoked when a call is rejected
 * @returns {{withRateLimit: Function, isLimited: boolean, remainingMs: number, reset: Function, callCount: number}}
 */
export function useRateLimiter(options = {}) {
  const { interval = 1000, onRejected } = options;
  const lastCallTimeRef = useRef(0);
  const timeoutRef = useRef(null);
  const callCountRef = useRef(0);
  const [, forceUpdate] = useState(0);

  const canCall = useCallback(() => {
    const now = Date.now();
    return now - lastCallTimeRef.current >= interval;
  }, [interval]);

  const getRemainingMs = useCallback(() => {
    const now = Date.now();
    const elapsed = now - lastCallTimeRef.current;
    return Math.max(0, interval - elapsed);
  }, [interval]);

  const withRateLimit = useCallback(
    (fn) => {
      return (...args) => {
        if (!canCall()) {
          onRejected?.();
          return false;
        }

        lastCallTimeRef.current = Date.now();
        callCountRef.current += 1;

        try {
          return fn(...args);
        } finally {
          // Re-render even if the wrapped callback throws.
          forceUpdate((n) => n + 1);

          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          timeoutRef.current = setTimeout(() => {
            forceUpdate((n) => n + 1);
            timeoutRef.current = null;
          }, interval);
        }
      };
    },
    [canCall, interval, onRejected]
  );

  const reset = useCallback(() => {
    lastCallTimeRef.current = 0;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    forceUpdate((n) => n + 1);
  }, []);

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
    callCount: callCountRef.current,
  };
}

export default useRateLimiter;
