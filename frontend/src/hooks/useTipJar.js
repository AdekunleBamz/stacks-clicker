import { useState, useCallback } from 'react';
import { callContract } from '../utils/walletconnect';
import { useNotifications } from './useNotifications';
import { parseContractError } from '../utils/errors';
import { DEPLOYER, TIPJAR_CONTRACT as CONTRACT_NAME, MIN_TIP_MICRO_STX } from '../utils/constants';

/**
 * Custom hook for interacting with the TipJar smart contract.
 * Manages tipping, withdrawals, and contract pings with centralized loading state.
 *
 * @param {Object} options - Hook options
 * @param {Function} options.onTxSubmit - Shared callback triggered when a transaction is broadcasted
 * @returns {Object} { isLoading, tip, withdraw, handleSelfPing }
 * @property {Function} isLoading - Checks if a specific function is loading: (actionKey) => boolean
 * @property {Function} tip - Sends a tip transaction: (amount: number) => void
 * @property {Function} withdraw - Triggers a withdrawal transaction for the user
 * @property {Function} handleSelfPing - Triggers a self-ping heartbeat for the user
 */
export function useTipJar({ onTxSubmit }) {
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
  const isLoading = useCallback((functionName) => !!loadingStates[`tipjar-${functionName}`], [loadingStates]);

  /**
   * Core executor for contract calls.
   * @param {string} displayName - Human readable name for the action
   * @param {string} functionName - Contract function name
   * @param {Array} functionArgs - Arguments for the contract call
   */
  const executeAction = useCallback(async (displayName, functionName, functionArgs = []) => {
    const key = `tipjar-${functionName}`;
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
  }, [onTxSubmit, setLoading, showError, showLoading]);

  const tip = useCallback(
    (amount = 1000) => {
      const numericAmount = Number(amount);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        showError('Invalid tip amount. Must be a positive number.');
        return;
      }
      if (numericAmount < 100) {
        showError('Minimum tip is 100 micro-STX.');
        return;
      }
      return executeAction('💰 Tip', 'tip', [{ type: 'uint128', value: numericAmount.toString() }]);
    },
    [executeAction, showError]
  );
  const withdraw = useCallback(() => executeAction('💸 Withdraw', 'withdraw'), [executeAction]);
  const handleSelfPing = useCallback(() => executeAction('📡 Self-Ping', 'self-ping'), [executeAction]);

  return {
    isLoading,
    tip,
    withdraw,
    handleSelfPing
  };
}
