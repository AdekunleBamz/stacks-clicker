/**
 * Custom hook for capturing global keydown events with multi-key support.
 *
 * @param {Object} keyMap - Mapping of keys to handler functions (e.g., { 'Escape': handleClose, 'Enter': handleSubmit })
 */
export function useKeydown(keyMap) {
  const keyMapRef = useRef(keyMap);

  // Update ref if keyMap changes
  useEffect(() => {
    keyMapRef.current = keyMap;
  }, [keyMap]);

  useEffect(() => {
    function handleKeyDown(event) {
      // Ignore if user is typing in an input, textarea, or contentEditable element
      const isTyping = event.target.tagName === 'INPUT' ||
                       event.target.tagName === 'TEXTAREA' ||
                       event.target.isContentEditable;

      if (isTyping) return;

      const handler = keyMapRef.current[event.key];
      if (handler) {
        handler(event);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
