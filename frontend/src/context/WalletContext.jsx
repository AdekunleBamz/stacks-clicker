import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { showConnect, disconnect } from '@stacks/connect';
import toast from 'react-hot-toast';
import { STACKS_NETWORK } from '../utils/constants';

/**
 * @typedef {Object} WalletContextValue
 * @property {string|null} address - The current Stacks mainnet address of the connected user
 * @property {Function} connectWallet - Function to trigger the Stacks connection modal
 * @property {Function} disconnectWallet - Function to clear the session and disconnect the wallet
 * @property {Object} appDetails - Metadata for the Stacks connection (name, icon)
 * @property {boolean} isConnected - Computed boolean indicating if a wallet is currently linked
 */

/** @type {React.Context<WalletContextValue|null>} */
export const WalletContext = createContext(null);

function getAppDetails() {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return {
    name: 'StacksClicker',
    icon: `${origin}/favicon.svg`,
  };
}

/**
 * Provider component that manages the global Stacks wallet state and authentication lifecycle.
 * Integrates with @stacks/connect for browser-based wallet interactions.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Application components requiring wallet access
 * @returns {JSX.Element} The WalletContext provider wrapping child components
 */
export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const checkConnection = useCallback(() => {
    if (typeof window === 'undefined') {
      setAddress(null);
      return;
    }

    try {
      const stored = window.localStorage.getItem('stacks-session');
      if (stored) {
        const userData = JSON.parse(stored);
        const nextAddress =
          STACKS_NETWORK === 'testnet'
            ? userData?.addresses?.testnet || userData?.addresses?.mainnet
            : userData?.addresses?.mainnet || userData?.addresses?.testnet;

        if (nextAddress) {
          setAddress(nextAddress);
          return;
        }
      }
    } catch (error) {
      console.warn('Failed to parse stored wallet session:', error);
    }
    setAddress(null);
  }, []);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  /**
   * Opens the Stacks wallet connection modal and handles authentication callbacks.
   */
  const connectWallet = useCallback(() => {
    setIsConnecting(true);
    showConnect({
      appDetails: getAppDetails(),
      onFinish: () => {
        setIsConnecting(false);
        checkConnection();
        toast.success('Wallet connected! 🎉');
      },
      onCancel: () => {
        setIsConnecting(false);
        toast.error('Connection cancelled');
      },
    });
  }, [checkConnection]);

  const disconnectWallet = useCallback(() => {
    disconnect();
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('stacks-session');
    }
    setAddress(null);
    toast('Wallet disconnected', { icon: '👋' });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleStorage = (event) => {
      if (event.key !== 'stacks-session') return;

      if (event.newValue === null) {
        setAddress(null);
        return;
      }

      checkConnection();
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [checkConnection]);

  const appDetails = useMemo(() => getAppDetails(), []);

  const value = useMemo(
    () => ({
      address,
      connectWallet,
      disconnectWallet,
      appDetails,
      isConnected: !!address,
      isConnecting,
    }),
    [address, connectWallet, disconnectWallet, appDetails, isConnecting]
  );


  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

WalletProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom hook to consume the Stacks wallet context.
 * Must be used within a WalletProvider tree.
 *
 * @returns {WalletContextValue} The shared wallet state and controls
 * @throws {Error} If called outside of a WalletProvider
 */
export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
}

export default WalletContext;
