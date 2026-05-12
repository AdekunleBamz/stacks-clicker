import { useState, useCallback, useEffect, useRef } from 'react';
import { notify } from '../utils/toast';

/**
 * Attempts a legacy textarea-based copy when the async Clipboard API is unavailable.
 *
 * @param {string} text - Text to place on the clipboard.
 * @returns {boolean} Whether the fallback copy command succeeded.
 */
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
 * Falls back to the legacy `execCommand` API when the Clipboard API is unavailable.
 *
 * @param {Object} options - Hook options
 * @param {number} [options.timeout=2000] - Duration in ms before the copied state resets
 * @returns {{ copied: boolean, copyToClipboard: Function }} Clipboard state and copy action
 */
export function useClipboard({ timeout = 2000 } = {}) {
  const safeTimeout = Number.isFinite(timeout) && timeout > 0 ? timeout : 2000;
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

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

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setCopied(false);
          timeoutRef.current = null;
        }, safeTimeout);
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
          }, safeTimeout);
          return true;
        }

        console.error('Failed to copy text:', error);
        notify.error('Unable to copy');
        return false;
      }
    },
    [safeTimeout]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setCopied(false);
  }, []);

  return { copied, copyToClipboard, reset };
}
