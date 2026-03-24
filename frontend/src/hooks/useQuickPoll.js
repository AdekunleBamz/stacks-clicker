import { useState, useCallback } from 'react';
import { callContract } from '../utils/walletconnect';

/** @constant {string} Smart contract deployer address */
const DEPLOYER = (import.meta.env.VITE_DEPLOYER_ADDRESS || '').trim();
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
  const { showError, showLoading } = useNotifications();

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
  const isLoading = useCallback((functionName) => !!loadingStates[`quickpoll-${functionName}`], [loadingStates]);

  /**
   * Core executor for contract calls.
   * @param {string} displayName - Human readable name for the action
   * @param {string} functionName - Contract function name
   * @param {Array} functionArgs - Arguments for the contract call
   */
  const executeAction = useCallback(async (displayName, functionName, functionArgs = [], actionKey = functionName) => {
    const key = `quickpoll-${actionKey}`;
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
      const userFriendlyError = parseContractError(err);
      showError(userFriendlyError);
      console.error(`${displayName} failed:`, err);
      throw err;
    } finally {
      setLoading(key, false);
    }
  }, [onTxSubmit, setLoading, showError, showLoading]);

  const vote = useCallback(
    (pollId, option) => {
      const normalizedPollId = Number.isFinite(pollId) && pollId >= 0 ? Math.floor(pollId) : 0;
      const normalizedOption = Number.isFinite(option) && option >= 0 ? Math.floor(option) : 0;
      return executeAction('🗳️ Vote', 'vote', [
        { type: 'uint128', value: normalizedPollId.toString() },
        { type: 'uint128', value: normalizedOption.toString() }
      ]);
    },
    [executeAction]
  );

  const createPoll = useCallback((question) => {
    const normalizedQuestion = String(question).trim();
    if (!/^[\x00-\x7F]+$/.test(normalizedQuestion)) {
      throw new Error('Poll question must use ASCII characters');
    }
    return executeAction('📝 Create Poll', 'create-poll', [{ type: 'string-ascii', value: normalizedQuestion }]);
  }, [executeAction]);
  const handlePollPing = useCallback(
    () => executeAction('📡 Poll-Ping', 'ping', [], 'poll-ping'),
    [executeAction]
  );

  return {
    isLoading,
    vote,
    createPoll,
    handlePollPing
  };
}
