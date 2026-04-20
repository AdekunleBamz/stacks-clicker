import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking the window scroll position.
 * Useful for scroll-based animations and UI state changes.
 *
 * @returns {Object} { x, y }
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({
    x: typeof window !== 'undefined' ? window.scrollX : 0,
    y: typeof window !== 'undefined' ? window.scrollY : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll, { passive: true });
    };
  }, []);

  return scrollPosition;
}

/**
 * Custom hook that returns true when the page is scrolled to the top.
 *
 * @returns {boolean} True if scrollY is 0
 */
export function useIsAtTop() {
  const { y } = useScrollPosition();
  return y === 0;
}

/**
 * Custom hook that returns true when the page is scrolled near the bottom.
 *
 * @param {number} [threshold=50] - Pixels from bottom to consider "at bottom"
 * @returns {boolean}
 */
export function useIsAtBottom(threshold = 50) {
  const { y } = useScrollPosition();
  if (typeof window === 'undefined') return false;
  const distanceFromBottom = document.documentElement.scrollHeight - window.innerHeight - y;
  return distanceFromBottom <= threshold;
}
