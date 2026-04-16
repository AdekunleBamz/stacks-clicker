import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking the pressed state of a specific key.
 *
 * @param {string} targetKey - The key to track (e.g., 'Enter', 'Shift')
 * @returns {boolean} Whether the target key is currently pressed
 */
export function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler, { passive: true });
    window.addEventListener('keyup', upHandler, { passive: true });

    return () => {
      window.removeEventListener('keydown', downHandler, { passive: true });
      window.removeEventListener('keyup', upHandler, { passive: true });
    };
  }, [targetKey]);

  return keyPressed;
}
