import { useState, useCallback } from 'react';
import { useWallet } from '../context/WalletContext';
import { callContract } from '../utils/stacksWallet';
import { notify } from '../utils/toast';
import { DEPLOYER_ADDRESS, CONTRACT_NAMES } from '../config/contracts';

/** @constant {string} QuickPoll contract name */
const CONTRACT_NAME = CONTRACT_NAMES.quickpoll;

/**
 * Custom hook for QuickPoll contract interactions.
 * @param {Object} options - Hook options.
 * @param {Function} [options.onTxSubmit] - Callback for transaction submission.
 * @returns {Object} QuickPoll actions and loading state.
 */
export function useQuickPoll({ onTxSubmit } = {}) {
  const { isConnected } = useWallet();
  const [loadingStates, setLoadingStates] = useState({});

  const executeAction = useCallback(
    async (key, functionName, functionArgs = []) => {
      if (!isConnected) return;
      setLoadingStates((prev) => ({ ...prev, [key]: true }));
      try {
        const result = await callContract({
          contractAddress: DEPLOYER_ADDRESS,
          contractName: CONTRACT_NAME,
          functionName,
          functionArgs,
        });
        onTxSubmit?.(key, result.txId);
        return result;
      } catch (err) {
        console.error(`QuickPoll action ${key} failed:`, err);
        throw err;
      } finally {
        setLoadingStates((prev) => ({ ...prev, [key]: false }));
      }
    },
    [isConnected, onTxSubmit]
  );

  const vote = useCallback(
    (_pollId, option) => {
      const voteYesFlag = option === true || option === 1 || option === 'yes';
      return executeAction('🗳️ Vote', voteYesFlag ? 'vote-yes' : 'vote-no');
    },
    [executeAction]
  );

  const createPoll = useCallback(
    () => {
      notify.info('Poll creation is not available on this contract version.');
      return undefined;
    },
    []
  );
  const handlePollPing = useCallback(() => executeAction('📡 Poll-Ping', 'ping'), [executeAction]);

  return {
    isLoading: (key) => !!loadingStates[key],
    vote,
    createPoll,
    handlePollPing,
  };
}
