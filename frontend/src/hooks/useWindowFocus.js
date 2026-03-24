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

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return isFocused;
}
