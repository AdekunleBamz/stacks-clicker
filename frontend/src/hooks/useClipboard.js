import { useState, useCallback, useRef, useEffect } from 'react';
import { notify } from '../utils/toast';

function fallbackCopy(text) {
  if (typeof document === 'undefined' || typeof document.execCommand !== 'function') {
    return false;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  const copied = document.execCommand('copy');
  document.body.removeChild(textarea);
  return copied;
}

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

      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else if (!fallbackCopy(text)) {
          notify.error('Clipboard not available');
          return false;
        }

        setCopied(true);
        notify.success('Copied to clipboard!');

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), safeTimeout);
        return true;
      } catch (error) {
        if (fallbackCopy(text)) {
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
        }

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
