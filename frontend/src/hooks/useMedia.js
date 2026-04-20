import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking the state of a media query.
 *
 * @param {string} query - The media query to match (e.g., '(min-width: 768px)')
 * @returns {boolean} Whether the media query matches
 */
export function useMedia(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !query || typeof query !== 'string') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !query || typeof query !== 'string') return undefined;

    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    // Modern browsers use addEventListener
    media.addEventListener('change', listener);

    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}
