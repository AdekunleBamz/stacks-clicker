import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for detecting online/offline status.
 * Provides real-time connectivity status and event callbacks.
 *
 * @param {Object} [options] - Configuration options
 * @param {Function} [options.onOnline] - Callback when connection is restored
 * @param {Function} [options.onOffline] - Callback when connection is lost
 * @returns {Object} Online status state and handlers
 * @returns {boolean} return.isOnline - Current online status
 * @returns {boolean} return.wasOffline - Whether the user was offline (persisted across sessions)
 * @returns {number|null} return.lastOfflineAt - Timestamp when user went offline
 * @returns {number|null} return.lastOnlineAt - Timestamp when user came back online
 *
 * @example
 * ```jsx
 * const { isOnline, wasOffline, lastOfflineAt } = useOnlineStatus({
 *   onOnline: () => console.log('Connection restored!'),
 *   onOffline: () => console.log('Connection lost!')
 * });
 *
 * if (!isOnline) {
 *   return <OfflineBanner />;
 * }
 * ```
 */
export function useOnlineStatus(options = {}) {
  const { onOnline, onOffline } = options;

  const [isOnline, setIsOnline] = useState(() => typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [wasOffline, setWasOffline] = useState(false);
  const [lastOfflineAt, setLastOfflineAt] = useState(null);
  const [lastOnlineAt, setLastOnlineAt] = useState(null);

  const handleOnline = useCallback(() => {
    setIsOnline(true);
    setWasOffline(false);
    setLastOnlineAt(Date.now());
    onOnline?.();
  }, [onOnline]);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
    setWasOffline(true);
    setLastOfflineAt(Date.now());
    onOffline?.();
  }, [onOffline]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOnline, handleOffline]);

  return {
    isOnline,
    wasOffline,
    lastOfflineAt,
    lastOnlineAt,
  };
}

export default useOnlineStatus;
