import { useState, useCallback, useRef, useEffect } from 'react';
import { notify } from '../utils/toast';

/**
 * Custom hook for interacting with the system clipboard.
 * Provides a clean interface for copying text and tracking copy status.
 *
 * @param {Object} options - Hook options
 * @param {number} [options.timeout=2000] - Duration in ms before the copied state resets
 * @returns {Object} { copied, copyToClipboard }
 */
export function useClipboard({ timeout = 2000 } = {}) {
  const safeTimeout = Number.isFinite(timeout) && timeout > 0 ? timeout : 2000;
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copyToClipboard = useCallback(
    async (text) => {
      if (!text) return false;

      if (!navigator?.clipboard?.writeText) {
        notify.error('Clipboard not available');
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        notify.success('Copied to clipboard!');

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), safeTimeout);
        return true;
      } catch (error) {
        console.error('Failed to copy text:', error);
        notify.error('Unable to copy');
        return false;
      }
    },
    [timeout]
  );

  const clearCopied = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCopied(false);
  }, []);

  return { copied, copyToClipboard, clearCopied };
}
