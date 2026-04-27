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
    if (typeof window === 'undefined' || !trimmedQuery) return undefined;

    const media = window.matchMedia(trimmedQuery);
    const listener = () => setMatches(media.matches);

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', listener);
      return () => {
        media.removeEventListener('change', listener);
      };
    }

    // Legacy Safari fallback
    media.addListener(listener);
    return () => {
      media.removeListener(listener);
    };
  }, [trimmedQuery]);

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

/**
 * Returns true when viewport width is between 640px and 1023px (tablet).
 * @returns {boolean}
 */
export function useIsTablet() {
  return useMedia('(min-width: 640px) and (max-width: 1023px)');
}
