import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { callContract } from '../utils/walletconnect';

const DEPLOYER = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT';

/**
 * Custom hook for Clicker contract interactions.
 * @param {Object} options - Hook options.
 * @param {Function} [options.onTxSubmit] - Callback for transaction submission.
 * @returns {Object} Clicker actions and loading state.
 */
export function useClicker({ onTxSubmit } = {}) {
  const { isConnected } = useWallet();
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = (key, val) => {
    setLoadingStates((prev) => ({ ...prev, [key]: val }));
  };

  const executeAction = async (key, functionName, functionArgs = []) => {
    if (!isConnected) return;
    setLoading(key, true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'clicker-v2p',
        functionName,
        functionArgs,
      });
      onTxSubmit?.(key, result.txId);
      return result;
    } catch (err) {
      console.error(`Clicker action ${key} failed:`, err);
      throw err;
    } finally {
      setLoading(key, false);
    }
  };

  return {
    isLoading: (key) => !!loadingStates[key],
    click: () => executeAction('clicker-click', 'click'),
    multiClick: (count = 10) => executeAction('clicker-multi-click', 'multi-click', [
      { type: 'uint128', value: count.toString() }
    ]),
    ping: () => executeAction('clicker-ping', 'ping'),
  };
}
