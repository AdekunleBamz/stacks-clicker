import { useState, useEffect } from 'react';

/**
 * Custom hook to monitor the Stacks network status and current block height.
 * Periodically polls the Hiro API to provide real-time blockchain telemetry.
 *
 * @returns {Object} { blockHeight, isConnected, network }
 * @property {number} blockHeight - The current tip height of the Stacks blockchain
 * @property {boolean} isConnected - True if the network is reachable and responding
 * @property {string} network - The current network environment (e.g., 'mainnet', 'testnet')
 */
export function useNetwork() {
  const [blockHeight, setBlockHeight] = useState(840000); // Realistic baseline
  const [isConnected, setIsConnected] = useState(true);
  const [network, setNetwork] = useState('mainnet');

  useEffect(() => {
    let isMounted = true;

    const fetchStatus = async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      try {
        const response = await fetch('https://api.mainnet.hiro.so/v2/info', {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Network offline');

        const data = await response.json();

        if (isMounted) {
          setBlockHeight(data.stacks_tip_height);
          setNetwork(
            data.network_id === 1 ? 'mainnet' : data.network_id === 2147483648 ? 'testnet' : 'unknown'
          );
          setIsConnected(true);
        }
      } catch (error) {
        if (isMounted) {
          console.warn('Stacks Network Status Check Failed:', error);
          setIsConnected(false);
        }
      } finally {
        clearTimeout(timeout);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Update every 30s

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { blockHeight, isConnected, network };
}
