import { useState, useCallback } from 'react';
import { callContract } from '../utils/walletconnect';
import { useNotifications } from './useNotifications';
import { DEPLOYER, TIPJAR_CONTRACT as CONTRACT_NAME } from '../utils/constants';
import { stacksClickerSdk } from '../utils/sdk';

/**
 * Custom hook for interacting with the TipJar smart contract.
 * Manages tipping and contract pings with centralized loading state.
 *
 * @param {Object} options - Hook options
 * @param {Function} options.onTxSubmit - Shared callback triggered when a transaction is broadcasted
 * @returns {Object} { isLoading, tip, handleSelfPing }
 * @property {Function} isLoading - Checks if a specific function is loading: (actionKey) => boolean
 * @property {Function} tip - Sends a tip transaction: (amount: number) => void
 * @property {Function} handleSelfPing - Triggers a self-ping heartbeat for the user
 */
export function useTipJar({ onTxSubmit }) {
  const [loadingStates, setLoadingStates] = useState({});
  const { showError, showLoading } = useNotifications();
  const STX_TO_MICROSTX = 1_000_000;

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
  const executeAction = useCallback(async (displayName, functionName, functionArgs = [], actionKey = functionName) => {
    const key = `tipjar-${actionKey}`;
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
  }, [onTxSubmit]);

  const tip = useCallback((amount = 0.001) => {
    const normalized = Number(amount);
    const microStxAmount = Number.isFinite(normalized)
      ? Math.max(1, Math.round(normalized * STX_TO_MICROSTX))
      : 1;
    const payload = stacksClickerSdk.tip(microStxAmount);
    return executeAction('💰 Tip', payload.functionName, payload.functionArgs);
  }, [executeAction]);

  const handleSelfPing = useCallback(
    () => executeAction('📡 Self-Ping', 'ping', [], 'self-ping'),
    [executeAction]
  );

  return {
    isLoading,
    tip,
    handleSelfPing
  };
}
