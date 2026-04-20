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
      const debounceDelay = 150;
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize, { passive: true });
      clearTimeout(timeoutId);
    };
  }, []);

  return windowSize;
}

/**
 * Custom hook that returns true when the viewport is in portrait orientation.
 *
 * @returns {boolean} True if height >= width
 */
export function useIsPortrait() {
  const { width, height } = useWindowSize();
  return height >= width;
}
