import { useState, useRef, useLayoutEffect } from 'react';

/**
 * Custom hook for measuring an element's dimensions using ResizeObserver.
 *
 * @returns {Array} [ref, dimensions]
 */
export function useMeasure() {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    x: 0,
    y: 0,
    right: 0,
    bottom: 0,
  });

  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    // Perform initial measurement
    const initialRect = ref.current.getBoundingClientRect();
    setDimensions(initialRect);

    if (typeof ResizeObserver === 'undefined') {
      // Fallback: keep the initial rect; no reactive updates available
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      if (entry && entry.contentRect) {
        setDimensions(entry.contentRect);
      }
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref, dimensions];
}
