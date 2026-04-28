import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for tracking the hover state of an element.
 *
 * @returns {[Object, boolean, Function]} [ref, isHovered, resetHover]
 */
export function useHover() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const node = ref.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      node.addEventListener('mouseleave', handleMouseLeave, { passive: true });

      return () => {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
    return undefined;
  }, []);

  const resetHover = useCallback(() => setIsHovered(false), []);

  return [ref, isHovered, resetHover];
}

/**
 * Custom hook for tracking whether an element has ever been hovered.
 * Useful for lazy-loading or reveal-on-interaction patterns.
 *
 * @returns {[Object, boolean]} [ref, hasBeenHovered]
 */
export function useHasBeenHovered() {
  const [hasBeenHovered, setHasBeenHovered] = useState(false);
  const [ref, isHovered] = useHover();

  useEffect(() => {
    if (isHovered) setHasBeenHovered(true);
  }, [isHovered]);

  return [ref, hasBeenHovered];
}
