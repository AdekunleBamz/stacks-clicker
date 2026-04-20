import { useCallback, useEffect, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { notify } from '../utils/toast';
import { useDocumentVisibility } from './useDocumentVisibility';

const DEBUG = import.meta.env.VITE_DEBUG === 'true';

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
  const txCount = useMemo(() => txLog.length, [txLog]);

  useEffect(() => {
    if (!DEBUG) return;

    if (!isVisible) {
      console.debug('[useTransactionHistory] Tab hidden: Pausing background log updates');
    } else {
      console.debug('[useTransactionHistory] Tab visible: Resuming background log updates');
    }
  }, [DEBUG, isVisible]);

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
        network: 'mainnet',
        explorerUrl: isPending ? null : `https://explorer.hiro.so/txid/${txId}?chain=mainnet`,
        isPending,
      };

      setTxLog((prev) => [tx, ...prev.slice(0, 49)]); // Maintain last 50 TXs
      playSound?.('success');
      notify.custom(`${action} submitted!`, action.split(' ')[0]);

      onTxAdded?.(tx);
      return tx;
    },
    [playSound, onTxAdded, setTxLog]
  );

  /**
   * Clears all session transaction logs.
   */
  const clearLog = useCallback(() => {
    setTxLog([]);
    if (DEBUG) {
      console.debug('[useTransactionHistory] Transaction log cleared');
    }
  }, [DEBUG, setTxLog]);
  
  return {
    txLog,
    addTxToLog,
    setTxLog,
    clearLog,
    pendingTxs,
    txCount,
  };
}
