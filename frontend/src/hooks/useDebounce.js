import { useState, useEffect, useCallback, useRef } from 'react';

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
    const resolvedDelay = Number.isFinite(delay) && delay >= 0 ? delay : 300;

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

/**
 * Custom hook that returns a debounced version of a callback function.
 *
 * @param {Function} callback - The function to debounce
 * @param {number} delay - Debounce delay in ms
 * @returns {Function} Debounced callback
 */
export function useDebouncedCallback(callback, delay) {
  const timerRef = useRef(null);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useCallback(
    (...args) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      const resolvedDelay = Number.isFinite(delay) && delay >= 0 ? delay : 300;
      timerRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, resolvedDelay);
    },
    [delay]
  );
}

/**
 * Returns the pending state of a debounced value — true while the debounce delay is active.
 *
 * @param {any} value - The raw (undebounced) value
 * @param {number} delay - Debounce delay in ms
 * @returns {{ debouncedValue: any, isPending: boolean }}
 */
export function useDebounceWithPending(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const resolvedDelay = Number.isFinite(delay) && delay >= 0 ? delay : 300;
    setIsPending(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsPending(false);
    }, resolvedDelay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return { debouncedValue, isPending };
}
