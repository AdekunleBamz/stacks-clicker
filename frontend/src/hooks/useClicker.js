import { useState, useCallback } from 'react';
import { callContract } from '../utils/walletconnect';
import { useNotifications } from './useNotifications';
import { DEPLOYER, CLICKER_CONTRACT as CONTRACT_NAME } from '../utils/constants';
import { stacksClickerSdk } from '../utils/sdk';

/**
 * Custom hook for interacting with the Clicker smart contract.
 * Provides functions for single click, multi-click, and network ping with centralized loading state.
 *
 * @param {Object} options - Hook options
 * @param {Function} options.onTxSubmit - Shared callback triggered when a transaction is broadcasted (receives action name and txId)
 * @returns {Object} { isLoading, click, multiClick, ping }
 * @property {Function} isLoading - Function checking if a specific action is pending: (actionKey) => boolean
 * @property {Function} click - Triggers a single click transaction
 * @property {Function} multiClick - Triggers a multi-click transaction: (amount: number) => void
 * @property {Function} ping - Triggers a network ping/heartbeat transaction
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
        showError(`${displayName} failed.`);
        console.error(`${displayName} failed:`, err);
        throw err;
      } finally {
        setLoading(key, false);
      }
    },
    [onTxSubmit]
  );

  const click = useCallback(() => {
    const payload = stacksClickerSdk.click();
    return executeAction('🎯 Click', payload.functionName, payload.functionArgs);
  }, [executeAction]);

  const multiClick = useCallback(
    (amount = 1) => {
      const payload = stacksClickerSdk.multiClick(amount);
      return executeAction('🔥 Multi-Click', payload.functionName, payload.functionArgs);
    },
    [executeAction]
  );
  const ping = useCallback(() => {
    const payload = stacksClickerSdk.ping();
    return executeAction('📡 Ping', payload.functionName, payload.functionArgs);
  }, [executeAction]);

  return {
    isLoading,
    click,
    multiClick,
    ping,
  };
}
