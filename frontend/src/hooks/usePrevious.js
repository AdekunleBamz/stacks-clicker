import { useEffect, useRef } from 'react';

/**
 * Custom hook for capturing the previous value of a prop or state.
 * Useful for comparing old vs new values to trigger side effects.
 *
 * @param {any} value - The current value to track
 * @returns {any} The value from the previous render
 */
export function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
