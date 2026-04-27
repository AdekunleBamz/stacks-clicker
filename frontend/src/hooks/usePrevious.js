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

/**
 * Custom hook that returns true when the value has changed since the last render.
 *
 * @param {any} value - The current value to track
 * @returns {boolean} True if value changed from the previous render
 */
export function useHasChanged(value) {
  const previous = usePrevious(value);
  const hasChanged = previous !== undefined && previous !== value;
  return { hasChanged, previous };
}

  /**
   * Custom hook that returns true only on the very first render.
   *
   * @returns {boolean} True on the first render, false thereafter
   */
  export function useIsFirstRender() {
    const isFirstRender = useRef(true);
    useEffect(() => {
      isFirstRender.current = false;
    }, []);
    return isFirstRender.current;
  }
