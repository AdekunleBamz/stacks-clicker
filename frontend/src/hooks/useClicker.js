import { useState, useCallback } from 'react';
import { callContract } from '../utils/walletconnect';
import { useNotifications } from './useNotifications';
import { parseContractError } from '../utils/errors';
import { DEPLOYER, CLICKER_CONTRACT as CONTRACT_NAME } from '../utils/constants';

/**
 * Custom hook for interacting with the Clicker smart contract.
 * Provides functions for single click, multi-click, and network ping with centralized loading state.
 *
 * @param {Object} options - Hook options
 * @param {Function} options.onTxSubmit - Shared callback triggered when a transaction is broadcasted (receives action name and txId)
 * @returns {Object} { isLoading, click, multiClick, ping, resetStreak }
 * @property {Function} isLoading - Function checking if a specific action is pending: (actionKey) => boolean
 * @property {Function} click - Triggers a single click transaction
 * @property {Function} multiClick - Triggers a multi-click transaction: (amount: number) => void
 * @property {Function} ping - Triggers a network ping/heartbeat transaction
 * @property {Function} resetStreak - Resets the current click streak on-chain
 */
export function useClicker({ onTxSubmit }) {
  const [loadingStates, setLoadingStates] = useState({});
  const { showError, showLoading } = useNotifications();

  /**
   * Internal helper to update loading state for a specific action key.
   */
  const setLoading = useCallback((key, val) => {
    setLoadingStates((prev) => {
      if (prev[key] === val) return prev;
      return { ...prev, [key]: val };
    });
  }, []);

  /**
   * Checks if a specific contract function is currently loading.
   * @param {string} functionName - Name of the contract function
   * @returns {boolean} True if loading
   */
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
  const executeAction = useCallback(
    async (displayName, functionName, functionArgs = []) => {
      const key = `clicker-${functionName}`;
      setLoading(key, true);
      try {
        showLoading(`Broadcasting ${displayName}...`);
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

  const click = useCallback(() => executeAction('🎯 Click', 'click'), [executeAction]);
  const multiClick = useCallback(
    (amount = 1) => {
      const normalizedAmount = Number.isFinite(amount) && amount > 0 ? Math.floor(amount) : 1;
      return executeAction('🔥 Multi-Click', 'multi-click', [
        { type: 'uint128', value: normalizedAmount.toString() },
      ]);
    },
    [executeAction]
  );
  const ping = useCallback(() => executeAction('📡 Ping', 'ping'), [executeAction]);
  const resetStreak = useCallback(
    () => executeAction('♻️ Reset Streak', 'reset-streak'),
    [executeAction]
  );

  return {
    isLoading,
    click,
    multiClick,
    ping,
    resetStreak,
  };
}
