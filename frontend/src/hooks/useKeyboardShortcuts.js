import { useEffect } from 'react';

/**
 * Custom hook to manage global keyboard shortcuts for the application.
 *
 * @param {Object} options - Shortcut configurations
 * @param {boolean} options.isEnabled - Whether shortcuts are active
 * @param {Object} options.actions - Action map for specific keys
 * @param {Function} options.playSound - Function to play feedback sounds
 */
export function useKeyboardShortcuts({ isEnabled, actions, playSound }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeElement = document.activeElement;
      const isTyping =
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'SELECT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.isContentEditable;

      if (isTyping || e.repeat || e.metaKey || e.ctrlKey || e.altKey || !isEnabled) {
        return;
      }

      if (e.key.toLowerCase() === 'c' && actions.click) {
        e.preventDefault();
        playSound?.('click');
        actions.click();
      }
      if (e.key.toLowerCase() === 't' && actions.tip) {
        e.preventDefault();
        playSound?.('click');
        actions.tip(1000); // Standard quick tip amount (micro-STX)
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown, { passive: false });
  }, [isEnabled, actions, playSound]);
}
