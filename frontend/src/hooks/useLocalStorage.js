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
  const resolveInitialValue = useCallback(
    () => (typeof initialValue === 'function' ? initialValue() : initialValue),
    [initialValue]
  );

  const readValue = useCallback(() => {
    if (typeof window === 'undefined') return resolveInitialValue();

    try {
      const item = window.localStorage.getItem(trimmedKey);
      return item ? JSON.parse(item) : resolveInitialValue();
    } catch (error) {
      console.warn(`Error reading localStorage key "${trimmedKey}":`, error);
      return resolveInitialValue();
    }
  }, [resolveInitialValue, trimmedKey]);

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = useCallback(
    (value) => {
      try {
        setStoredValue((previousValue) => {
          const valueToStore = typeof value === 'function' ? value(previousValue) : value;

          // Prevent redundant writes if values are deep-equal (simple check for now)
          if (JSON.stringify(valueToStore) === JSON.stringify(previousValue)) {
            return previousValue;
          }

          if (typeof window !== 'undefined') {
            window.localStorage.setItem(trimmedKey, JSON.stringify(valueToStore));
            window.dispatchEvent(new CustomEvent('local-storage', { detail: { key: trimmedKey } }));
          }

          return valueToStore;
        });
      } catch (error) {
        console.error(`[useLocalStorage] Error setting key "${trimmedKey}":`, error);
      }
    },
    [trimmedKey]
  );

  useEffect(() => {
    setStoredValue(readValue());

    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleStorageChange = (e) => {
      const changedKey = e.key ?? e.detail?.key;
      if (changedKey !== trimmedKey) {
        return;
      }

      if (e.newValue === null && e.type === 'storage') {
        setStoredValue(resolveInitialValue());
        return;
      }

      try {
        if (e.type === 'storage') {
          setStoredValue(JSON.parse(e.newValue));
          return;
        }
        setStoredValue(readValue());
      } catch (error) {
        console.warn(`Error parsing storage event for key "${trimmedKey}":`, error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [resolveInitialValue, trimmedKey, readValue]);

  return [storedValue, setValue];
}
