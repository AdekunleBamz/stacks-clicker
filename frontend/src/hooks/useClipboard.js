import { useState, useCallback, useEffect, useRef } from 'react';
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

export function useClipboard({ timeout = 2000 } = {}) {
  const safeTimeout = Number.isFinite(timeout) && timeout > 0 ? timeout : 2000;
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  const copyToClipboard = useCallback(
    async (text) => {
      if (!text) return false;

      if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
        notify.error('Clipboard not available');
        return false;
      }

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

  return { copied, copyToClipboard };
}
