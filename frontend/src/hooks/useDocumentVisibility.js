import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking the visibility of the current document (tab active/hidden).
 * Useful for pausing/resuming expensive operations like polling or animations.
 *
 * @returns {boolean} isVisible
 */
export function useDocumentVisibility() {
  const [isVisible, setIsVisible] = useState(
    typeof document !== 'undefined' ? document.visibilityState === 'visible' : true
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
}
