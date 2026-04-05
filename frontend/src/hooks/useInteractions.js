import { useCallback, useMemo } from 'react';
import { useClicker } from './useClicker';
import { useTipJar } from './useTipJar';
import { useQuickPoll } from './useQuickPoll';

/**
 * Collector hook that unifies all smart contract interaction hooks into a single interface.
 * Centralizes the onTxSubmit logic and provides a stable, memoized API for the main application grid.
 *
 * @param {Object} options - Hook options
 * @param {Function} options.onTxSubmit - Shared callback for all transaction broadcasts
 * @returns {Object} { clicker, tipjar, quickpoll, pingAll }
 * @property {Object} clicker - API for the Clicker contract
 * @property {Object} tipjar - API for the TipJar contract
 * @property {Object} quickpoll - API for the QuickPoll contract
 * @property {Function} pingAll - Unified function to trigger heartbeat pings across all contracts
 */
export function useInteractions({ onTxSubmit }) {
  /**
   * Enhanced callback that adds tactile haptic feedback (Vibration API)
   * to transaction submissions to improve mobile game feel.
   */
  const handleTxSubmit = useCallback((action, txId) => {
    // Trigger short haptic pulse (40ms) if supported
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(40);
    }

    // Continue with original submission callback
    onTxSubmit?.(action, txId);
  }, [onTxSubmit]);

  const clicker = useClicker({ onTxSubmit: handleTxSubmit });
  const tipjar = useTipJar({ onTxSubmit: handleTxSubmit });
  const quickpoll = useQuickPoll({ onTxSubmit: handleTxSubmit });

  /**
   * Triggers heartbeat/ping transactions for all active smart contracts simultaneously.
   */
  const pingAll = useCallback(() => {
    // Fire-and-forget keeps each domain hook responsible for its own loading and error handling.
    clicker?.ping?.();
    tipjar?.handleSelfPing?.();
    quickpoll?.handlePollPing?.();
  }, [clicker, tipjar, quickpoll]);

  const isAnyLoading = useMemo(
    () => !!(clicker?.isLoading || tipjar?.isLoading || quickpoll?.isLoading),
    [clicker, tipjar, quickpoll]
  );

  return useMemo(() => ({
    clicker,
    tipjar,
    quickpoll,
    pingAll,
    isAnyLoading,
  }), [clicker, tipjar, quickpoll, pingAll, isAnyLoading]);
}
