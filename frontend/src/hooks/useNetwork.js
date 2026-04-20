import { useState, useEffect, useCallback } from 'react';
import { useInterval } from './useInterval';
import { useWindowFocus } from './useWindowFocus';
import { useDocumentVisibility } from './useDocumentVisibility';
import { STACKS_NETWORK, CONFIG } from '../utils/constants';

const CONFIGURED_NETWORK = STACKS_NETWORK;
const HIRO_INFO_ENDPOINT = `${CONFIG.API_URL}/v2/info`;

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
  const [network, setNetwork] = useState(CONFIGURED_NETWORK);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const isFocused = useWindowFocus();
  const isVisible = useDocumentVisibility();

  const fetchStatus = useCallback(async () => {
    setIsUpdating(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(HIRO_INFO_ENDPOINT, {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Network offline');

      const data = await response.json();
      const parsedHeight = Number(data.stacks_tip_height);
      const safeHeight = Number.isFinite(parsedHeight) ? parsedHeight : 0;

      setBlockHeight(safeHeight);
      setNetwork(
        data.network_id === 1 ? 'mainnet' : data.network_id === 2147483648 ? 'testnet' : 'unknown'
      );
      setIsConnected(true);
      setLastUpdated(Date.now());
    } catch (error) {
      if (error?.name !== 'AbortError') {
        console.warn('Stacks Network Status Check Failed:', error);
      }
      setIsConnected(false);
    } finally {
      clearTimeout(timeout);
      setIsUpdating(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused && isVisible) {
      fetchStatus();
    }
  }, [fetchStatus, isFocused, isVisible]);

  useInterval(fetchStatus, isFocused && isVisible ? 30000 : null); // Update every 30s only when active

  const blocksSince = useCallback(
    (referenceHeight) => {
      const ref = Number(referenceHeight);
      if (!Number.isFinite(ref) || !Number.isFinite(blockHeight)) return null;
      return Math.max(0, blockHeight - ref);
    },
    [blockHeight]
  );

  return { blockHeight, isConnected, network, isUpdating, lastUpdated, blocksSince };
}
