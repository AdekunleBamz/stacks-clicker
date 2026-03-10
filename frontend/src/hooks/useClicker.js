import { useState, useCallback } from 'react';
import { callContract } from '../utils/walletconnect';

const DEPLOYER = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT';

export function useClicker({ onTxSubmit }) {
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = (key, val) => {
    setLoadingStates(prev => ({ ...prev, [key]: val }));
  };

  const isLoading = useCallback((key) => !!loadingStates[key], [loadingStates]);

  const executeAction = async (name, functionName, functionArgs = []) => {
    const key = `clicker-${functionName}`;
    setLoading(key, true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'click-v2p',
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
  };

  const click = () => executeAction('🎯 Click', 'click');
  const multiClick = (amount) => executeAction('🔥 Multi-Click', 'multi-click', [{ type: 'uint128', value: amount.toString() }]);
  const ping = () => executeAction('📡 Ping', 'ping');

  return {
    isLoading,
    click,
    multiClick,
    ping
  };
}
