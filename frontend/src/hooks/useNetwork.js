import { useState, useEffect } from 'react';

/**
 * Custom hook to monitor Stacks network status and block height.
 *
 * @returns {Object} { blockHeight, isConnected }
 */
export function useNetwork() {
  const [blockHeight, setBlockHeight] = useState(834512);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        // Mock fetch for demonstration, replace with actual Stacks API call if needed
        const newHeight = blockHeight + (Math.random() > 0.9 ? 1 : 0);
        setBlockHeight(newHeight);
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
      }
    };

    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [blockHeight]);

  return { blockHeight, isConnected };
}
