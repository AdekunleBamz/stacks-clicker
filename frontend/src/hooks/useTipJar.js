import { useState, useCallback } from 'react';
import { callContract } from '../utils/walletconnect';
import { DEPLOYER, TIPJAR_CONTRACT as CONTRACT_NAME } from '../utils/constants';

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

  /**
   * Internal helper to update loading state for a specific action key.
   * @param {string} key - Unique key for the action
   * @param {boolean} val - Loading state value
   */
  const setLoading = (key, val) => {
    setLoadingStates(prev => ({ ...prev, [key]: val }));
  };

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

  const tip = useCallback((amount = 1000) => executeAction('💰 Tip', 'tip', [{ type: 'uint128', value: amount.toString() }]), [executeAction]);
  const withdraw = useCallback(() => executeAction('💸 Withdraw', 'withdraw'), [executeAction]);
  const handleSelfPing = useCallback(() => executeAction('📡 Self-Ping', 'self-ping'), [executeAction]);

  return {
    isLoading,
    tip,
    withdraw,
    handleSelfPing
  };
}
