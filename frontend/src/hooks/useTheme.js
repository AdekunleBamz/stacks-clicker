import { useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

function getSystemTheme() {
  if (
    typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-color-scheme: light)').matches
  ) {
    return 'light';
  }
  return 'dark';
}

/**
 * Custom hook for managing the application theme (light/dark).
 * Synchronizes with localStorage and updates the document's data-theme attribute.
 *
 * @returns {Object} { theme, toggleTheme, setTheme }
 */
export function useTheme() {
  const [theme, setTheme] = useLocalStorage('theme', getSystemTheme);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const validTheme = theme === 'light' || theme === 'dark' ? theme : 'dark';
    document.documentElement.setAttribute('data-theme', validTheme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  const resetTheme = useCallback(() => {
    setTheme(getSystemTheme());
  }, [setTheme]);

  return {
    theme,
    toggleTheme,
    setTheme,
    resetTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    systemTheme: getSystemTheme(),
  };
}
