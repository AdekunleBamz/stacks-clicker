import { useEffect, useRef } from 'react';

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
    if (!title || typeof title !== 'string') return;
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    document.title = count > 0 ? `(${count}) ${trimmedTitle}` : trimmedTitle;
    return () => {
      if (restoreOnUnmount) {
        document.title = previousTitle.current;
      }
    };
  }, [title, count, restoreOnUnmount]);
}
