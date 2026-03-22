import { useState, useCallback } from 'react';
import { callContract } from '../utils/walletconnect';

/** @constant {string} Smart contract deployer address */
const DEPLOYER = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT';
/** @constant {string} QuickPoll contract name */
const CONTRACT_NAME = 'quickpoll-v2p';

/**
 * Custom hook for interacting with the QuickPoll smart contract.
 * Enables creating polls, voting on existing polls, and contract pings with centralized loading state.
 *
 * @param {Object} options - Hook options
 * @param {Function} options.onTxSubmit - Shared callback triggered when a transaction is broadcasted
 * @returns {Object} { isLoading, vote, createPoll, handlePollPing }
 * @property {Function} isLoading - Checks if a specific function is loading: (actionKey) => boolean
 * @property {Function} vote - Casts a vote on a specific poll: (pollId: number, option: number) => void
 * @property {Function} createPoll - Creates a new poll with a given question: (question: string) => void
 * @property {Function} handlePollPing - Triggers a heartbeat ping for the poll system
 */
export function useQuickPoll({ onTxSubmit }) {
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
  const isLoading = useCallback((functionName) => !!loadingStates[`quickpoll-${functionName}`], [loadingStates]);

  /**
   * Core executor for contract calls.
   * @param {string} displayName - Human readable name for the action
   * @param {string} functionName - Contract function name
   * @param {Array} functionArgs - Arguments for the contract call
   */
  const executeAction = useCallback(async (displayName, functionName, functionArgs = []) => {
    const key = `quickpoll-${functionName}`;
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

  const vote = useCallback((pollId, option) => executeAction('🗳️ Vote', 'vote', [
    { type: 'uint128', value: pollId.toString() },
    { type: 'uint128', value: option.toString() }
  ]), [executeAction]);

  const createPoll = useCallback((question) => {
    const normalizedQuestion = String(question).trim();
    return executeAction('📝 Create Poll', 'create-poll', [{ type: 'string-ascii', value: normalizedQuestion }]);
  }, [executeAction]);
  const handlePollPing = useCallback(() => executeAction('📡 Poll-Ping', 'poll-ping'), [executeAction]);

  return {
    isLoading,
    vote,
    createPoll,
    handlePollPing
  };
}
