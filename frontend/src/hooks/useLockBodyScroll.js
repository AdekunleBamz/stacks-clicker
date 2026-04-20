import { useLayoutEffect } from 'react';

/**
 * Custom hook for locking the body scroll when a component (like a modal) is mounted.
 * Restores original scroll behavior upon unmounting.
 */
export function useLockBodyScroll() {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
}
