import { useEffect } from 'react';

/**
 * Custom hook for dynamically updating the document title.
 * Useful for providing reactive feedback (e.g., interaction counts) in the browser tab.
 *
 * @param {Object} options - Hook options
 * @param {string} options.title - Base title for the document
 * @param {number} [options.count=0] - Numerical value to display in parentheses
 */
export function useDocumentTitle({ title, count = 0 }) {
  useEffect(() => {
    if (!title || typeof title !== 'string') return;
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    const previous = document.title;
    document.title = count > 0 ? `(${count}) ${trimmedTitle}` : trimmedTitle;
    return () => {
      document.title = previous;
    };
  }, [title, count]);
}
