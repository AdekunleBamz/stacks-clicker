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

  return {
    isLoading,
    lastActionName,
    click,
    multiClick,
    ping,
    resetStreak,
  };
}
