import { useLayoutEffect, useRef } from 'react';

/**
 * Custom hook for locking the body scroll when a component (like a modal) is mounted.
 * Restores original scroll behavior upon unmounting.
 *
 * @param {boolean} [isLocked=true] - Whether to lock body scroll
 */
export function useLockBodyScroll(isLocked = true) {
  const lockCountRef = useRef(0);

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !isLocked) return;
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    lockCountRef.current += 1;

    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.touchAction = '';
    };
  }, [isLocked]);
}
