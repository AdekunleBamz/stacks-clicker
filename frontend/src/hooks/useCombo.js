import { useState, useRef, useCallback, useEffect } from 'react';
import { COMBO_WINDOW_MS } from '../utils/constants';

/**
 * Custom hook for managing interaction combos.
 * Tracks consecutive actions within a time window and returns the current combo count.
 *
 * @param {Object} options - Hook options
 * @param {number} [options.timeout=2000] - Time in ms before the combo resets
 * @returns {Object} { combo, incrementCombo, resetCombo }
 */
export function useCombo({ timeout = COMBO_WINDOW_MS } = {}) {
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const timerRef = useRef(null);
  const safeTimeout = Number.isFinite(timeout) && timeout > 0 ? timeout : COMBO_WINDOW_MS;

  const resetCombo = useCallback(() => {
    setCombo(0);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const incrementCombo = useCallback(() => {
    setCombo((prev) => {
      const next = prev + 1;
      setMaxCombo((m) => Math.max(m, next));
      return next;
    });

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCombo(0);
    }, safeTimeout);
  }, [safeTimeout]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return {
    combo,
    maxCombo,
    isPeak: combo > 0 && combo === maxCombo,
    incrementCombo,
    resetCombo,
    isActive: combo > 0,
    hasPendingReset: timerRef.current !== null,
    comboLabel: combo > 1 ? `${combo}x combo!` : null,
  };
}
