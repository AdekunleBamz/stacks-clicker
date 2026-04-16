import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook for capturing long-press interactions.
 * Useful for mobile-friendly contextual actions.
 *
 * @param {Function} callback - The function to execute on long press
 * @param {Object} options - Configuration options
 * @param {number} options.delay - The duration in ms to trigger a long press (default: 500)
 * @returns {Object} Event handlers to spread onto the target element
 */
export function useLongPress(callback, { delay = 500 } = {}) {
  const [isPressing, setIsPressing] = useState(false);
  const timerRef = useRef();

  const start = useCallback((event) => {
    setIsPressing(true);
    timerRef.current = setTimeout(() => {
      callback(event);
      setIsPressing(false);
    }, delay);
  }, [callback, delay]);

  const stop = useCallback(() => {
    clearTimeout(timerRef.current);
    setIsPressing(false);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
}
