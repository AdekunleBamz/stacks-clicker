import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { callContract } from '../utils/walletconnect';

const DEPLOYER = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT';

/**
 * Custom hook for QuickPoll contract interactions.
 * @param {Object} options - Hook options.
 * @param {Function} [options.onTxSubmit] - Callback for transaction submission.
 * @returns {Object} QuickPoll actions and loading state.
 */
export function useQuickPoll({ onTxSubmit } = {}) {
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
        contractName: 'quickpoll-v2p',
        functionName,
        functionArgs,
      });
      onTxSubmit?.(key, result.txId);
      return result;
    } catch (err) {
      console.error(`QuickPoll action ${key} failed:`, err);
      throw err;
    } finally {
      setLoading(key, false);
    }
  }, [onTxSubmit]);

  const vote = useCallback((pollId, option) => {
    const voteYesFlag = option === true || option === 1 || option === 'yes';
    return executeAction('🗳️ Vote', 'vote', [
      { type: 'uint128', value: pollId.toString() },
      { type: 'bool', value: voteYesFlag }
    ]);
  }, [executeAction]);

  const createPoll = useCallback((question) => {
    const normalizedQuestion = String(question).trim();
    return executeAction('📝 Create Poll', 'create-poll', [{ type: 'string-ascii', value: normalizedQuestion }]);
  }, [executeAction]);
  const handlePollPing = useCallback(() => executeAction('📡 Poll-Ping', 'poll-ping'), [executeAction]);

  return {
    isLoading: (key) => !!loadingStates[key],
    voteYes: () => executeAction('quickpoll-vote-yes', 'vote-yes'),
    voteNo: () => executeAction('quickpoll-vote-no', 'vote-no'),
    ping: () => executeAction('quickpoll-ping', 'poll-ping'),
  };
}
