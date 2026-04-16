import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking whether the window is currently focused.
 * Useful for adaptive behavior when the user switches between windows.
 *
 * @returns {boolean} isFocused
 */
export function useWindowFocus() {
  const [isFocused, setIsFocused] = useState(
    typeof window !== 'undefined' ? document.hasFocus() : true
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const handleVisibilityChange = () => {
      setIsFocused(!document.hidden);
    };

    window.addEventListener('focus', handleFocus, { passive: true });
    window.addEventListener('blur', handleBlur, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    return () => {
      window.removeEventListener('focus', handleFocus, { passive: true });
      window.removeEventListener('blur', handleBlur, { passive: true });
      document.removeEventListener('visibilitychange', handleVisibilityChange, { passive: true });
    };
  }, []);

  return isFocused;
}
