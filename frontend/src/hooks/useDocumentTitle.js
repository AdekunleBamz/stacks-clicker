import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for dynamically updating the document title.
 * Useful for providing reactive feedback (e.g., interaction counts) in the browser tab.
 *
 * @param {Object} options - Hook options
 * @param {string} options.title - Base title for the document
 * @param {number} [options.count=0] - Numerical value to display in parentheses
 * @param {boolean} [options.restoreOnUnmount=true] - Whether to restore the previous title on unmount
 */
export function useDocumentTitle({ title, count = 0, restoreOnUnmount = true }) {
  const previousTitle = useRef(typeof document !== 'undefined' ? document.title : '');

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!title || typeof title !== 'string') return;
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    const safeCount = Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;
    document.title = safeCount > 0 ? `(${safeCount}) ${trimmedTitle}` : trimmedTitle;
    return () => {
      if (restoreOnUnmount) {
        document.title = previousTitle.current;
      }
    };
  }, [title, count, restoreOnUnmount]);

  const resetTitle = useCallback(() => {
    if (typeof document !== 'undefined') {
      document.title = previousTitle.current;
    }
  }, []);

  return { resetTitle };
}
