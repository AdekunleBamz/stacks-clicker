import { useRef, useCallback } from 'react';

/**
 * Custom hook for throttling a function call.
 * Ensures the function is called at most once per specified delay.
 *
 * @param {Function} callback - The function to throttle
 * @param {number} delay - Throttle delay in ms
 * @returns {Function} Throttled version of the callback
 */
export function useThrottle(callback, delay) {
  const lastCall = useRef(0);
  const safeDelay = Number.isFinite(delay) && delay > 0 ? delay : 0;

  return useCallback(
    (...args) => {
      const now = Date.now();
      if (now - lastCall.current >= safeDelay) {
        lastCall.current = now;
        return callback(...args);
      }
    },
    [callback, safeDelay]
  );
}
