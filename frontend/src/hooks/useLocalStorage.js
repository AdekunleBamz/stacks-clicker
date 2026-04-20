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
  if (!key || typeof key !== 'string' || !key.trim()) {
    throw new Error('useLocalStorage: key must be a non-empty string');
  }
  const trimmedKey = key.trim();
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(trimmedKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${trimmedKey}":`, error);
      return initialValue;
    }
  }, [trimmedKey, initialValue]);

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = typeof value === 'function' ? value(storedValue) : value;

        // Prevent redundant writes if values are deep-equal (simple check for now)
        if (JSON.stringify(valueToStore) === JSON.stringify(storedValue)) {
          return;
        }

        setStoredValue(valueToStore);

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          window.dispatchEvent(new CustomEvent('local-storage', { detail: { key } }));
        }
      } catch (error) {
        console.error(`[useLocalStorage] Error setting key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  useEffect(() => {
    setStoredValue(readValue());

    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleStorageChange = (e) => {
      const changedKey = e.key ?? e.detail?.key;
      if (changedKey !== key) {
        return;
      }

      if (e.newValue === null && e.type === 'storage') {
        setStoredValue(initialValue);
        return;
      }

      try {
        if (e.type === 'storage') {
          setStoredValue(JSON.parse(e.newValue));
          return;
        }
        setStoredValue(readValue());
      } catch (error) {
        console.warn(`Error parsing storage event for key "${key}":`, error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [initialValue, key, readValue]);

  return [storedValue, setValue];
}
