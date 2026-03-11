import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for synchronizing state with window.localStorage.
 * Provides a reactive state that persists across page reloads and synchronizes across multiple tabs/windows.
 *
 * @param {string} key - The localStorage key to subscribe to
 * @param {any} initialValue - Default value if no existing value is found in storage
 * @returns {[any, Function]} A stateful value and a function to update it.
 */
export function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or fallback
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(readValue);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  useEffect(() => {
    setStoredValue(readValue());

    // Listen for changes in other tabs
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, readValue]);

  return [storedValue, setValue];
}
