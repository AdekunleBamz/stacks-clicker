import { useState, useRef, useCallback } from 'react';

/**
 * Custom hook for managing interaction combos.
 * Tracks consecutive actions within a time window and returns the current combo count.
 *
 * @param {Object} options - Hook options
 * @param {number} [options.timeout=2000] - Time in ms before the combo resets
 * @returns {Object} { combo, incrementCombo, resetCombo }
 */
export function useCombo({ timeout = 2000 } = {}) {
  const [combo, setCombo] = useState(0);
  const timerRef = useRef(null);

  const resetCombo = useCallback(() => {
    setCombo(0);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const incrementCombo = useCallback(() => {
    setCombo((prev) => prev + 1);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCombo(0);
    }, timeout);
  }, [timeout]);

  return {
    combo,
    incrementCombo,
    resetCombo,
  };
}
