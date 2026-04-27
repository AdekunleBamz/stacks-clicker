import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking the online/offline status of the browser.
 * Useful for disabling contract interactions when connectivity is lost.
 *
 * @returns {boolean} isOnline
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof window !== 'undefined' ? window.navigator.onLine : true
  );
  const [lastChanged, setLastChanged] = useState(null);
  const [connectionCount, setConnectionCount] = useState(0);
  const [offlineCount, setOfflineCount] = useState(0);


  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => { setIsOnline(true); setLastChanged(Date.now()); setConnectionCount((c) => c + 1); };
    const handleOffline = () => { setIsOnline(false); setLastChanged(Date.now()); setOfflineCount((c) => c + 1); };

    window.addEventListener('online', handleOnline, { passive: true });
    window.addEventListener('offline', handleOffline, { passive: true });

    return () => {
      window.removeEventListener('online', handleOnline, { passive: true });
      window.removeEventListener('offline', handleOffline, { passive: true });
    };
  }, []);

  return { isOnline, lastChanged, connectionCount, offlineCount, hasEverGoneOffline: offlineCount > 0 };
}
