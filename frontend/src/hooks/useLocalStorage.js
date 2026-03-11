import { useState, useEffect } from 'react';

/**
 * Custom hook for synchronizing state with window.localStorage.
 *
 * @param {string} key - The localStorage key.
 * @param {any} initialValue - Default value if no key is found.
 * @returns {[any, Function]} - State and setter.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
