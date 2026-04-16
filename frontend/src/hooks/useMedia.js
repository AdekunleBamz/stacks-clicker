import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking the state of a media query.
 *
 * @param {string} query - The media query to match (e.g., '(min-width: 768px)')
 * @returns {boolean} Whether the media query matches
 */
export function useMedia(query) {
  const [matches, setMatches] = useState(
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

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
