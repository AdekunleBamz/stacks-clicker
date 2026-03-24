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

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return keyPressed;
}
