import { useEffect, useRef } from 'react';

/**
 * Custom hook for capturing global keydown events.
 *
 * @param {string} targetKey - The key to listen for (e.g., 'Escape', 'Enter', 'c')
 * @param {Function} handler - The callback function to execute on keydown
 */
export function useKeydown(targetKey, handler) {
  const handlerRef = useRef(handler);

  // Update ref if handler changes
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === targetKey) {
        // Prevent default browser behavior if needed for specific shortcuts
        // For now, we just execute the handler
        handlerRef.current(event);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [targetKey]);
}
