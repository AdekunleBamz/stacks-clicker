import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing a value.
 * Useful for search inputs or other high-frequency state updates.
 *
 * @param {any} value - The value to debounce
 * @param {number} delay - Debounce delay in ms
 * @returns {any} The debounced value
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const resolvedDelay = typeof delay === 'number' && delay >= 0 ? delay : 300;

    if (resolvedDelay === 0) {
      setDebouncedValue(value);
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, resolvedDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
