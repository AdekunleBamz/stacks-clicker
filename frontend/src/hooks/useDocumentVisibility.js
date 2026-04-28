import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for tracking the visibility of the current document (tab active/hidden).
 * Useful for pausing/resuming expensive operations like polling or animations.
 *
 * @returns {{ isVisible: boolean, hiddenCount: number }} Visibility state and number of times hidden
 */
export function useDocumentVisibility() {
  const [isVisible, setIsVisible] = useState(
    typeof document !== 'undefined' ? document.visibilityState === 'visible' : true
  );
  const [hiddenCount, setHiddenCount] = useState(0);
  const prevVisible = useRef(isVisible);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      const visible = document.visibilityState === 'visible';
      if (!visible && prevVisible.current) {
        setHiddenCount((c) => c + 1);
      }
      prevVisible.current = visible;
      setIsVisible(visible);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return { isVisible, hiddenCount };
}
