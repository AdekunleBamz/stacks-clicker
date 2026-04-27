import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for tracking the pressed state of a specific key.
 *
 * @param {string} targetKey - The key to track (e.g., 'Enter', 'Shift')
 * @returns {Object} Hook result with state and helpers
 * @returns {boolean} return.isPressed - Current key press state
 * @returns {Function} return.reset - Reset to unpressed state
 * @returns {number} return.pressCount - Total times key was pressed (increments on keydown)
 */
export function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);
  const pressCountRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !targetKey) return;

    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true);
        pressCountRef.current += 1;
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

    const reset = () => setKeyPressed(false);

    return { isPressed: keyPressed, reset, pressCount: pressCountRef.current };
}
