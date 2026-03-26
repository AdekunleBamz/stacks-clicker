import { useState, useCallback } from 'react';
import { callContract } from '../utils/walletconnect';
import { useNotifications } from './useNotifications';
import { useThrottle } from './useThrottle';
import { DEPLOYER, CLICKER_CONTRACT as CONTRACT_NAME } from '../utils/constants';

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

  const executeAction = useCallback(
    async (displayName, functionName, functionArgs = []) => {
      const key = `clicker-${functionName}`;
      setLoading(key, true);
      try {
        showLoading(`Broadcasting ${displayName}...`);
        setLastActionName(displayName);
        const result = await callContract({
          contractAddress: DEPLOYER,
          contractName: CONTRACT_NAME,
          functionName,
          functionArgs,
        });
        onTxSubmit?.(displayName, result.txId);
        return result;
      } catch (err) {
        const userFriendlyError = parseContractError(err);
        showError(userFriendlyError);
        console.error(`${displayName} failed:`, err);
        throw err;
      } finally {
        setLoading(key, false);
      }
    },
    [onTxSubmit, setLoading, showError, showLoading]
  );

  const click = useThrottle(
    useCallback(() => executeAction('🎯 Click', 'click'), [executeAction]),
    1000
  );

  const multiClick = useThrottle(
    useCallback(
      (amount = 1) =>
        executeAction('🔥 Multi-Click', 'multi-click', [
          { type: 'uint128', value: amount.toString() },
        ]),
      [executeAction]
    ),
    1000
  );

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
