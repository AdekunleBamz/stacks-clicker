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
 * @param {Function} options.onTxSubmit - Shared callback triggered when a transaction is broadcasted (receives action name and txId)
 * @returns {Object} { isLoading, click, multiClick, ping }
 * @property {Function} isLoading - Function checking if a specific action is pending: (actionKey) => boolean
 * @property {Function} click - Triggers a single click transaction
 * @property {Function} multiClick - Triggers a multi-click transaction: (amount: number) => void
 * @property {Function} ping - Triggers a network ping/heartbeat transaction
 */
export function useClicker({ onTxSubmit }) {
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
  const isLoading = useCallback((functionName) => !!loadingStates[`clicker-${functionName}`], [loadingStates]);

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

  const click = useCallback(() => executeAction('🎯 Click', 'click'), [executeAction]);
  const multiClick = useCallback((amount) => executeAction('🔥 Multi-Click', 'multi-click', [{ type: 'uint128', value: amount.toString() }]), [executeAction]);
  const ping = useCallback(() => executeAction('📡 Ping', 'ping'), [executeAction]);

  return {
    isLoading,
    click,
    multiClick,
    ping
  };
}
