import { useState, useCallback, useEffect, useRef } from 'react';
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
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

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

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setCopied(false);
          timeoutRef.current = null;
        }, timeout);
        return true;
      } catch (error) {
        console.error('Failed to copy text:', error);
        notify.error('Unable to copy');
        return false;
      }
    },
    [timeout]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { copied, copyToClipboard };
}
