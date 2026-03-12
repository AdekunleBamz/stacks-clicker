import { useState, useCallback } from 'react';
import { callContract } from '../utils/walletconnect';

/** @constant {string} Smart contract deployer address */
const DEPLOYER = (import.meta.env.VITE_DEPLOYER_ADDRESS || '').trim();
/** @constant {string} Clicker contract name */
const CONTRACT_NAME = 'click-v2p';

/**
 * Custom hook for interacting with the Clicker smart contract.
 * Provides functions for single click, multi-click, and network ping with centralized loading state.
 *
 * @param {Object} options - Hook options
 * @param {Function} options.onTxSubmit - Shared callback triggered when a transaction is broadcasted
 * @returns {Object} { isLoading, click, multiClick, ping }
 */
export function useClicker({ onTxSubmit }) {
  const [loadingStates, setLoadingStates] = useState({});
  const [lastActionName, setLastActionName] = useState(null);
  const { showError, showLoading } = useNotifications();

  const setLoading = useCallback((key, val) => {
    setLoadingStates((prev) => {
      if (prev[key] === val) return prev;
      return { ...prev, [key]: val };
    });
  }, []);

  const isLoading = useCallback(
    (functionName) => !!loadingStates[`clicker-${functionName}`],
    [loadingStates]
  );

  /**
   * Core executor for contract calls.
   * @param {string} displayName - Human readable name for the action
   * @param {string} functionName - Contract function name
   * @param {Array} functionArgs - Arguments for the contract call
   */
  const executeAction = useCallback(async (displayName, functionName, functionArgs = []) => {
    if (!DEPLOYER) {
      throw new Error('VITE_DEPLOYER_ADDRESS is not set');
    }

    const key = `clicker-${functionName}`;
    setLoading(key, true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: CONTRACT_NAME,
        functionName,
        functionArgs,
      });
      onTxSubmit?.(displayName, result.txId);
      return result;
    } catch (err) {
      console.error(`${displayName} failed:`, err);
      throw err;
    } finally {
      setLoading(key, false);
    }
  }, [onTxSubmit]);

  const ping = useCallback(() => executeAction('📡 Ping', 'ping'), [executeAction]);
  const resetStreak = useCallback(
    () => executeAction('♻️ Reset Streak', 'reset-streak'),
    [executeAction]
  );

  return {
    isLoading,
    lastActionName,
    click,
    multiClick,
    ping,
    resetStreak,
  };
}
