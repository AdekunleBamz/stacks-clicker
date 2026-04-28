import { useState, useCallback, useRef } from 'react';
import { useWallet } from '../context/WalletContext';
import { callContract } from '../utils/walletconnect';
import { DEPLOYER_ADDRESS, CONTRACT_NAMES } from '../config/contracts';

/** @constant {string} Clicker contract name */
const CONTRACT_NAME = CONTRACT_NAMES.clicker;

/**
 * Custom hook for Clicker contract interactions.
 * @param {Object} options - Hook options.
 * @param {Function} [options.onTxSubmit] - Callback for transaction submission.
 * @returns {Object} Clicker actions and loading state.
 */
export function useClicker({ onTxSubmit } = {}) {
  const { isConnected } = useWallet();
  const [loadingStates, setLoadingStates] = useState({});
  const actionCountRef = useRef(0);

  const isLoading = useCallback(
    (functionName) => !!loadingStates[`clicker-${functionName}`],
    [loadingStates]
  );

  const executeAction = useCallback(
    async (displayName, functionName, functionArgs = []) => {
      const key = `clicker-${functionName}`;
      setLoadingStates((prev) => ({ ...prev, [key]: true }));
      actionCountRef.current += 1;
      try {
        const result = await callContract({
          contractAddress: DEPLOYER_ADDRESS,
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
        setLoadingStates((prev) => ({ ...prev, [key]: false }));
      }
    },
    [onTxSubmit]
  );

  const click = useCallback(() => executeAction('🎯 Click', 'click'), [executeAction]);
  const multiClick = useCallback(
    (amount) =>
      executeAction('🔥 Multi-Click', 'multi-click', [
        { type: 'uint128', value: amount.toString() },
      ]),
    [executeAction]
  );

  const ping = useCallback(() => executeAction('📡 Ping', 'ping'), [executeAction]);

  return {
    isLoading,
    click,
    multiClick,
    ping,
    actionCount: actionCountRef.current,
  };
}
