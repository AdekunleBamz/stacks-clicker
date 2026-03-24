import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive media queries in JavaScript.
 * Returns true if the current viewport matches the given query.
 *
 * @param {string} query - CSS media query (e.g., '(max-width: 600px)')
 * @returns {boolean} True if the query matches
 */
export function useMedia(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    
    // Modern browsers use addEventListener, older ones use addListener
    if (media.addEventListener) {
      media.addEventListener('change', listener);
    } else {
      media.addListener(listener);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}
