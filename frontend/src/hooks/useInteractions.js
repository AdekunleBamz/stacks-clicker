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
  const clicker = useClicker({ onTxSubmit });
  const tipjar = useTipJar({ onTxSubmit });
  const quickpoll = useQuickPoll({ onTxSubmit });

  /**
   * Triggers heartbeat/ping transactions for all active smart contracts simultaneously.
   */
  const pingAll = useCallback(() => {
    // Fire-and-forget keeps each domain hook responsible for its own loading and error handling.
    clicker?.ping?.();
    tipjar?.handleSelfPing?.();
    quickpoll?.handlePollPing?.();
  }, [clicker, tipjar, quickpoll]);

  return useMemo(() => ({
    clicker,
    tipjar,
    quickpoll,
    pingAll
  }), [clicker, tipjar, quickpoll, pingAll]);
}
