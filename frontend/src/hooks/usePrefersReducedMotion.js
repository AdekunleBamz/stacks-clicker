import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking the user's OS-level motion preference.
 * Useful for conditionally disabling/simplifying animations for accessibility.
 *
 * @returns {boolean} prefersReducedMotion
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMediaChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleMediaChange);
      return () => {
        mediaQuery.removeEventListener('change', handleMediaChange);
      };
    }

    mediaQuery.addListener(handleMediaChange);
    return () => {
      mediaQuery.removeListener(handleMediaChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Returns animation variants with motion disabled when reduced-motion is preferred.
 *
 * @param {Object} fullVariants - Full animation variants object
 * @returns {Object} Variants with transitions stripped if reduced motion is preferred
 */
export function useReducedMotionVariants(fullVariants) {
  const prefersReducedMotion = usePrefersReducedMotion();
  if (!prefersReducedMotion) return fullVariants;
  return Object.fromEntries(
    Object.entries(fullVariants).map(([key, val]) => [key, { ...val, transition: { duration: 0 } }])
  );
}
