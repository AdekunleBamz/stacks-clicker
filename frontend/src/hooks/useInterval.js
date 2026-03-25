import { useEffect, useRef } from 'react';

/**
 * Custom hook for declarative intervals.
 * Correctly handles React component lifecycle and avoids stale closures.
 *
 * @param {Function} callback - Function to execute on each interval
 * @param {number|null} delay - Delay in ms; pass null to pause the interval
 */
export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    function tick() {
      if (typeof savedCallback.current === 'function') {
        savedCallback.current();
      }
    }
    
    if (delay !== null && typeof delay === 'number' && delay >= 0) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return undefined;
  }, [delay]);
}
