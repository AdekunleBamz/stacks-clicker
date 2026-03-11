import { useState, useCallback } from 'react';
import { callContract } from '../utils/walletconnect';

const DEPLOYER = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT';

/**
 * Custom hook for interacting with the TipJar smart contract.
 * Manages tipping, withdrawals, and contract pings.
 *
 * @param {Object} options - Hook options.
 * @param {Function} options.onTxSubmit - Callback triggered when a transaction is broadcasted.
 * @returns {Object} Hook exports including action handlers and loading state.
 */
export function useTipJar({ onTxSubmit }) {
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = (key, val) => {
    setLoadingStates(prev => ({ ...prev, [key]: val }));
  };

  const isLoading = useCallback((key) => !!loadingStates[key], [loadingStates]);

  const executeAction = async (name, functionName, functionArgs = []) => {
    const key = `tipjar-${functionName}`;
    setLoading(key, true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'tipjar-v2p',
        functionName,
        functionArgs,
      });
      onTxSubmit?.(name, result.txId);
      return result;
    } catch (err) {
      console.error(`${name} failed:`, err);
      throw err;
    } finally {
      setLoading(key, false);
    }
  };

  const tip = (amount) => executeAction('💰 Tip', 'tip', [{ type: 'uint128', value: amount.toString() }]);
  const withdraw = () => executeAction('💸 Withdraw', 'withdraw');
  const handleSelfPing = () => executeAction('📡 Self-Ping', 'self-ping');

  return {
    isLoading,
    tip,
    withdraw,
    handleSelfPing
  };
}
