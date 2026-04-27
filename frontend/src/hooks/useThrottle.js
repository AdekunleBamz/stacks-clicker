import { useRef, useCallback, useState } from 'react';

/**
 * Custom hook for throttling a function call.
 * Ensures the function is called at most once per specified delay.
 *
 * @param {Function} callback - The function to throttle
 * @param {number} delay - Throttle delay in ms
 * @returns {{ throttled: Function, reset: Function, isThrottled: boolean, callCount: number }} Throttled callback, reset helper, throttle state, and call count
 */
export function useThrottle(callback, delay) {
  const lastCall = useRef(0);
  const callCountRef = useRef(0);
  const [isThrottled, setIsThrottled] = useState(false);
  const safeDelay = Number.isFinite(delay) && delay > 0 ? delay : 0;

  const throttled = useCallback(
    (...args) => {
      const now = Date.now();
      if (now - lastCall.current >= safeDelay) {
        lastCall.current = now;
        callCountRef.current += 1;
        setIsThrottled(false);
        return callback(...args);
      }
      setIsThrottled(true);
    },
    [callback, safeDelay]
  );

  const reset = useCallback(() => {
    lastCall.current = 0;
    callCountRef.current = 0;
    setIsThrottled(false);
  }, []);

  return { throttled, reset, isThrottled, callCount: callCountRef.current };
}
