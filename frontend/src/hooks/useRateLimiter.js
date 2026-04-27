import { useRef, useCallback, useEffect, useState } from 'react';

export function useRateLimiter(options = {}) {
  const { interval = 1000, onRejected } = options;
  const lastCallTimeRef = useRef(0);
  const timeoutRef = useRef(null);
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
        try {
          return fn(...args);
        } finally {
          // Force re-render to update isLimited state even if the callback throws.
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
