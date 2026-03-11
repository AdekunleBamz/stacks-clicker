import { useState, useCallback } from 'react';
import { callContract } from '../utils/walletconnect';

const DEPLOYER = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT';

/**
 * Custom hook for interacting with the QuickPoll smart contract.
 * Enables creating polls, voting on existing polls, and contract pings.
 *
 * @param {Object} options - Hook options.
 * @param {Function} options.onTxSubmit - Callback triggered when a transaction is broadcasted.
 * @returns {Object} Hook exports including vote/create functions and loading state.
 */
export function useQuickPoll({ onTxSubmit }) {
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = (key, val) => {
    setLoadingStates(prev => ({ ...prev, [key]: val }));
  };

  const isLoading = useCallback((key) => !!loadingStates[key], [loadingStates]);

  const executeAction = useCallback(async (name, functionName, functionArgs = []) => {
    const key = `quickpoll-${functionName}`;
    setLoading(key, true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'quickpoll-v2p',
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
  }, [onTxSubmit]);

  const vote = useCallback((pollId, option) => executeAction('🗳️ Vote', 'vote', [
    { type: 'uint128', value: pollId.toString() },
    { type: 'uint128', value: option.toString() }
  ]), [executeAction]);
  const createPoll = useCallback((question) => executeAction('📝 Create Poll', 'create-poll', [{ type: 'string-ascii', value: question }]), [executeAction]);
  const handlePollPing = useCallback(() => executeAction('📡 Poll-Ping', 'poll-ping'), [executeAction]);

  return {
    isLoading,
    vote,
    createPoll,
    handlePollPing
  };
}
