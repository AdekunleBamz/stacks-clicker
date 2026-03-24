import { useState, useEffect, useRef, useCallback } from 'react';

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

  return useCallback(
    (...args) => {
      const now = new Date().getTime();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        return callback(...args);
      }
    },
    [callback, delay]
  );
}
