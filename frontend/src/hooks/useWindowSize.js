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

/**
 * Custom hook that returns true when the viewport is considered mobile (width < 768px).
 *
 * @returns {boolean} True if window width is less than 768
 */
export function useIsMobile() {
  const { width } = useWindowSize();
  return width > 0 && width < 768;
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

/**
 * Returns the window aspect ratio as a number (width / height).
 * Returns null during SSR when dimensions are 0.
 *
 * @returns {number | null}
 */
export function useAspectRatio() {
  const { width, height } = useWindowSize();
  if (width === 0 || height === 0) return null;
  return width / height;
}
