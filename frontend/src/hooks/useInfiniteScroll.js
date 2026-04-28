import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom hook for infinite scroll pagination functionality.
 * Detects when the user scrolls near the bottom of a container and triggers loading more items.
 *
 * @param {Object} options - Configuration options
 * @param {number} [options.threshold=100] - Distance from bottom (in px) to trigger load more
 * @param {boolean} [options.isEnabled=true] - Whether infinite scroll is enabled
 * @param {number} [options.debounceMs=200] - Debounce time in milliseconds
 * @returns {Object} Infinite scroll state and handlers
 * @returns {React.RefObject} return.targetRef - Ref to attach to the scrollable container
 * @returns {boolean} return.isLoading - Whether currently loading more items
 * @returns {boolean} return.hasLoadedAll - Whether all items have been loaded
 * @returns {Function} return.loadMore - Function to manually trigger load more
 *
 * @example
 * ```jsx
 * const { targetRef, isLoading, hasLoadedAll, loadMore } = useInfiniteScroll({
 *   threshold: 150,
 *   isEnabled: true,
 *   debounceMs: 300
 * });
 *
 * return (
 *   <div ref={targetRef} onScroll={handleScroll}>
 *     {items.map(item => <Item key={item.id} {...item} />)}
 *     {isLoading && <LoadingSpinner />}
 *   </div>
 * );
 * ```
 */
export function useInfiniteScroll({
  threshold = 100,
  isEnabled = true,
  debounceMs = 200,
} = {}) {
  const targetRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedAll, setHasLoadedAll] = useState(false);
  const [page, setPage] = useState(1);
  const isLoadingRef = useRef(false);
  const debounceTimerRef = useRef(null);

  /**
   * Check if the scroll position is near the bottom
   */
  const checkScrollPosition = useCallback(() => {
    const element = targetRef.current;
    if (!element) return false;

    const { scrollTop, scrollHeight, clientHeight } = element;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;

    return distanceToBottom <= threshold;
  }, [threshold]);

  /**
   * Handle scroll events with debouncing
   */
  const handleScroll = useCallback(() => {
    if (!isEnabled || isLoadingRef.current || hasLoadedAll) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (checkScrollPosition()) {
        setIsLoading(true);
        isLoadingRef.current = true;
        setPage((prevPage) => prevPage + 1);
      }
    }, debounceMs);
  }, [isEnabled, hasLoadedAll, checkScrollPosition, debounceMs]);

  /**
   * Reset the infinite scroll state
   */
  const reset = useCallback(() => {
    setPage(1);
    setHasLoadedAll(false);
    setIsLoading(false);
    isLoadingRef.current = false;
  }, []);

  /**
   * Mark loading as complete
   */
  const onLoadComplete = useCallback(() => {
    setIsLoading(false);
    isLoadingRef.current = false;
  }, []);

  /**
   * Mark that all items have been loaded
   */
  const setAllLoaded = useCallback(() => {
    setHasLoadedAll(true);
    setIsLoading(false);
    isLoadingRef.current = false;
  }, []);

  // Set up scroll listener
  useEffect(() => {
    const element = targetRef.current;
    if (!element || !isEnabled) return;

    element.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      element.removeEventListener('scroll', handleScroll);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [handleScroll, isEnabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    targetRef,
    isLoading,
    hasLoadedAll,
    page,
    loadMore: () => {
      if (!isLoadingRef.current && !hasLoadedAll) {
        setIsLoading(true);
        isLoadingRef.current = true;
        setPage((prevPage) => prevPage + 1);
      }
    },
    reset,
    onLoadComplete,
    setAllLoaded,
  };
}

export default useInfiniteScroll;
