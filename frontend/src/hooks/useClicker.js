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
    lastActionName,
    click,
    multiClick,
    ping,
    resetStreak,
  };
}
