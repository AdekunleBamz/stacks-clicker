import { useState, useCallback, useEffect } from 'react';
import { notify } from '../utils/toast';
import { useDocumentVisibility } from './useDocumentVisibility';

/**
 * Custom hook for managing the transaction history log.
 * Handles adding new transactions, maintaining the log limit, and triggering feedback (sounds/toast).
 *
 * @param {Object} options - Hook options
 * @param {Function} options.playSound - Function to play sound effects
 * @param {Function} options.onTxAdded - Callback triggered after a transaction is added
 * @returns {Object} { txLog, addTxToLog, setTxLog }
 */
export function useTransactionHistory({ playSound, onTxAdded }) {
  const [txLog, setTxLog] = useState([]);
  const isVisible = useDocumentVisibility();

  useEffect(() => {
    if (!isVisible) {
      console.debug('[useTransactionHistory] Tab hidden: Pausing background log updates');
    } else {
      console.debug('[useTransactionHistory] Tab visible: Resuming background log updates');
    }
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
    [playSound, onTxAdded]
  );

  return {
    txLog,
    addTxToLog,
    setTxLog,
  };
}
