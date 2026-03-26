import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking the state of a media query.
 *
 * @param {string} query - The media query to match (e.g., '(min-width: 768px)')
 * @returns {boolean} Whether the media query matches
 */
export function useMedia(query) {
  const trimmedQuery = typeof query === 'string' ? query.trim() : '';
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !trimmedQuery) return false;
    return window.matchMedia(trimmedQuery).matches;
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

/**
 * Returns true when viewport width is below 640px (mobile small screen).
 * @returns {boolean}
 */
export function useIsSmallScreen() {
  return useMedia('(max-width: 639px)');
}

/**
 * Returns true when viewport width is at least 1024px (desktop large screen).
 * @returns {boolean}
 */
export function useIsLargeScreen() {
  return useMedia('(min-width: 1024px)');
}
