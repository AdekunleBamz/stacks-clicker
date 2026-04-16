import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking the current window dimensions.
 * Useful for programmatic responsive layout logic.
 *
 * @returns {Object} { width, height }
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId = null;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 250);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize, { passive: true });
      clearTimeout(timeoutId);
    };
  }, []);

  return windowSize;
}
