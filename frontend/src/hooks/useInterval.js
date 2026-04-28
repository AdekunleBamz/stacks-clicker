import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for declarative intervals.
 * Correctly handles closure-related staleness by using a mutable ref for the callback.
 *
 * @param {Function} callback - The function to execute on each interval
 * @param {number|null} delay - Delay in ms. Pass null to pause the interval.
 */
export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback.current === 'function') {
        savedCallback.current();
      }
    }
    const validDelay = Number.isFinite(delay) && delay >= 0;
    if (validDelay) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return undefined;
  }, [delay]);
}

/**
 * Custom hook that counts up from 0 by 1 every `delay` ms.
 *
 * @param {number|null} delay - Tick interval in ms. Pass null to pause.
 * @returns {number} The current count
 */
export function useCountup(delay) {
  const [count, setCount] = useState(0);
  useInterval(() => setCount((c) => c + 1), delay);
  const reset = () => setCount(0);
  return { count, reset };
}
