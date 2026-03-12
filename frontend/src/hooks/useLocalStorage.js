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

  const setValue = useCallback(
    (value) => {
      try {
        setStoredValue((currentValue) => {
          const valueToStore = value instanceof Function ? value(currentValue) : value;
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }
          return valueToStore;
        });
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  useEffect(() => {
    setStoredValue(readValue());

    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleStorageChange = (e) => {
      if (e.key !== key) {
        return;
      }

      if (e.newValue === null) {
        setStoredValue(initialValue);
        return;
      }

      try {
        setStoredValue(JSON.parse(e.newValue));
      } catch (error) {
        console.warn(`Error parsing storage event for key "${key}":`, error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [initialValue, key, readValue]);

  return [storedValue, setValue];
}
