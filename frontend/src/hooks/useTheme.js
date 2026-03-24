import { useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook for managing the application theme (light/dark).
 * Synchronizes with localStorage and update the document's data-theme attribute.
 *
 * @returns {Object} { theme, toggleTheme, setTheme }
 */
export function useTheme() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  return {
    theme,
    toggleTheme,
    setTheme,
  };
}
