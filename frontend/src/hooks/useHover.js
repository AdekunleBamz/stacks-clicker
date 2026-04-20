import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for tracking the hover state of an element.
 *
 * @returns {[Object, boolean]} [ref, isHovered]
 */
export function useHover() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const node = ref.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter);
      node.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
    return undefined;
  }, []);

  return [ref, isHovered];
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
