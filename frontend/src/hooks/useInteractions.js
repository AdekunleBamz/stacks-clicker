import { useCallback } from 'react';
import { useClicker } from './useClicker';
import { useTipJar } from './useTipJar';
import { useQuickPoll } from './useQuickPoll';

/**
 * Collector hook that unifies all smart contract interactions.
 * Centralizes the onTxSubmit logic and provides a clean interface for the UI.
 *
 * @param {Object} options - Hook options.
 * @param {Function} options.onTxSubmit - Shared callback for all transaction broadcasts.
 * @returns {Object} Unified interaction set including clicker, tipjar, and quickpoll.
 */
export function useInteractions({ onTxSubmit }) {
  const clicker = useClicker({ onTxSubmit });
  const tipjar = useTipJar({ onTxSubmit });
  const quickpoll = useQuickPoll({ onTxSubmit });

  const pingAll = useCallback(() => {
    clicker.ping();
    tipjar.handleSelfPing();
    quickpoll.handlePollPing();
  }, [clicker, tipjar, quickpoll]);

  return {
    clicker,
    tipjar,
    quickpoll,
    pingAll
  };
}
