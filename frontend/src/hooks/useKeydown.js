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
      // Ignore if user is typing in an input, textarea, or contentEditable element
      const isTyping = event.target.tagName === 'INPUT' || 
                       event.target.tagName === 'TEXTAREA' || 
                       event.target.isContentEditable;

      if (event.key === targetKey && !isTyping) {
        handlerRef.current(event);
      }
    }


    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [targetKey]);
}
