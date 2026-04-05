import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for using the Intersection Observer API.
 * Useful for scroll-triggered animations, lazy loading, or infinite scroll.
 *
 * @param {Object} options - IntersectionObserver configuration
 * @param {string} [options.rootMargin='0px'] - Margin around the root
 * @param {number} [options.threshold=0.1] - Percentage of visibility to trigger the callback
 * @param {boolean} [options.triggerOnce=true] - If true, the observer will disconnect after the first intersection
 * @returns {[React.RefObject, boolean]} A ref to attach to the element and a boolean indicating visibility
 */
export function useIntersectionObserver({
  rootMargin = '0px',
  threshold = 0.1,
  triggerOnce = true
} = {}) {
  const safeThreshold = Number.isFinite(threshold) ? Math.min(1, Math.max(0, threshold)) : 0.1;
  const [isIntersecting, setIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(element);
        }
      },
      { root, rootMargin, threshold: safeThreshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [root, rootMargin, threshold, triggerOnce]);

  return [elementRef, isIntersecting];
}
