import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { callContract } from '../utils/walletconnect';

const DEPLOYER = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT';

/**
 * Custom hook for TipJar contract interactions.
 * @param {Object} options - Hook options.
 * @param {Function} [options.onTxSubmit] - Callback for transaction submission.
 * @returns {Object} TipJar actions and loading state.
 */
export function useTipJar({ onTxSubmit } = {}) {
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
        contractName: 'tipjar-v2p',
        functionName,
        functionArgs,
      });
      onTxSubmit?.(key, result.txId);
      return result;
    } catch (err) {
      console.error(`TipJar action ${key} failed:`, err);
      throw err;
    } finally {
      setLoading(key, false);
    }
  }, [onTxSubmit]);

  const tip = useCallback(
    (amount = 1000) => {
      const normalizedAmount = Number.isFinite(amount) && amount > 0 ? Math.floor(amount) : 1000;
      return executeAction('💰 Tip', 'tip', [{ type: 'uint128', value: normalizedAmount.toString() }]);
    },
    [executeAction]
  );
  const withdraw = useCallback(() => executeAction('💸 Withdraw', 'withdraw'), [executeAction]);
  const handleSelfPing = useCallback(() => executeAction('📡 Self-Ping', 'self-ping'), [executeAction]);

  return {
    isLoading: (key) => !!loadingStates[key],
    quickTip: () => executeAction('tipjar-quick-tip', 'quick-tip'),
    tipUser: (recipient, amount) => executeAction('tipjar-tip-user', 'tip-user', [
      { type: 'principal', value: recipient },
      { type: 'uint128', value: (parseFloat(amount) * 1000000).toString() }
    ]),
    selfPing: () => executeAction('tipjar-ping', 'self-ping'),
  };
}
