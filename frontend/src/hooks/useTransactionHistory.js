import { useCallback, useEffect, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { notify } from '../utils/toast';
import { useDocumentVisibility } from './useDocumentVisibility';
import { MAX_TX_LOG_SIZE, CONFIG, STACKS_NETWORK } from '../utils/constants';

const STACKS_NETWORK =
  String(import.meta.env.VITE_STACKS_NETWORK || 'mainnet').trim().toLowerCase() === 'testnet'
    ? 'testnet'
    : 'mainnet';

/**
 * Custom hook for managing the transaction history log.
 * Handles adding new transactions, maintaining the log limit, and triggering feedback (sounds/toast).
 *
 * @param {Object} options - Hook options
 * @param {Function} options.playSound - Function to play sound effects
 * @param {Function} options.onTxAdded - Callback triggered after a transaction is added
 * @returns {Object} { txLog, addTxToLog, setTxLog, pendingTxs, txCount }
 */
export function useTransactionHistory({ playSound, onTxAdded }) {
  const [txLog, setTxLog] = useLocalStorage('stacks-tx-log', []);
  const isVisible = useDocumentVisibility();

  // Memoized derived stats
  const pendingTxs = useMemo(() => txLog.filter((tx) => tx.isPending), [txLog]);
  const successTxs = useMemo(() => txLog.filter((tx) => tx.status === 'success'), [txLog]);
  const failedTxs = useMemo(() => txLog.filter((tx) => tx.status === 'failed' || tx.status === 'error'), [txLog]);
  const txCount = useMemo(() => txLog.length, [txLog]);

  useEffect(() => {
    // tab visibility changes pauses/resumes background updates
  }, [isVisible]);

  /**
   * Adds a transaction record to the local session log.
   *
   * @param {string} action - Human-readable label for the interaction
   * @param {string} txId - The unique transaction hash
   * @param {string} [status='success'] - Current lifecycle state
   * @returns {Object} The formatted transaction object
   */
  const addTxToLog = useCallback(
    (action, txId, status = 'success') => {
      const submittedAt = new Date();
      const isPending = !txId || status === 'pending';
      const tx = {
        id: txId || `pending-${Date.now()}`,
        action,
        status,
        time: submittedAt.toLocaleTimeString(),
        submittedAt: submittedAt.toISOString(),
        network: STACKS_NETWORK,
        explorerUrl: isPending ? null : `https://explorer.hiro.so/txid/${txId}?chain=${STACKS_NETWORK}`,
        isPending,
      };

      setTxLog((prev) => {
        if (txId) {
          const existingIndex = prev.findIndex((entry) => entry.id === txId);
          if (existingIndex >= 0) {
            const existing = prev[existingIndex];
            const merged = {
              ...existing,
              ...tx,
              id: txId,
              submittedAt: existing.submittedAt ?? tx.submittedAt,
            };
            const withoutExisting = prev.filter((_, index) => index !== existingIndex);
            return [merged, ...withoutExisting].slice(0, MAX_TX_LOG_SIZE);
          }
        }

        return [tx, ...prev].slice(0, MAX_TX_LOG_SIZE);
      });
      playSound?.('success');
      notify.custom(`${action} submitted!`);

      onTxAdded?.(tx);
      return tx;
    },
    [playSound, onTxAdded, setTxLog]
  );

  /**
   * Removes a single transaction entry by id.
   */
  const removeTx = useCallback((id) => {
    setTxLog((prev) => prev.filter((tx) => tx.id !== id));
  }, [setTxLog]);

  /**
   * Clears all session transaction logs.
   */
  const clearLog = useCallback(() => {
    setTxLog([]);
  }, [setTxLog]);

  return {
    txLog,
    addTxToLog,
    setTxLog,
    clearLog,
    removeTx,
    pendingTxs,
    successTxs,
    failedTxs,
    txCount,
  };
}
