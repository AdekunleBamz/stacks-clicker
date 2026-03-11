import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { showConnect, disconnect } from '@stacks/connect';
import toast from 'react-hot-toast';

/**
 * @typedef {Object} WalletContextValue
 * @property {string|null} address - The current Stacks mainnet address of the connected user
 * @property {Function} connectWallet - Function to trigger the Stacks connection modal
 * @property {Function} disconnectWallet - Function to clear the session and disconnect the wallet
 * @property {Object} appDetails - Metadata for the Stacks connection (name, icon)
 * @property {boolean} isConnected - Computed boolean indicating if a wallet is currently linked
 */

/** @type {React.Context<WalletContextValue|null>} */
const WalletContext = createContext(null);

const appDetails = {
  name: 'StacksClicker',
  icon: window.location.origin + '/favicon.svg',
};

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

  /**
   * Synchronizes internal state with the persistent Stacks session in localStorage.
   */
  const checkConnection = useCallback(() => {
    try {
      const stored = localStorage.getItem('stacks-session');
      if (stored) {
        const userData = JSON.parse(stored);
        if (userData?.addresses?.mainnet) {
          setAddress(userData.addresses.mainnet);
        }
      }
    } catch (e) {
      // No existing connection or parse error
    }
  }, []);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  /**
   * Opens the Stacks wallet connection modal and handles authentication callbacks.
   */
  const connectWallet = () => {
    showConnect({
      appDetails,
      onFinish: () => {
        checkConnection();
        toast.success('Wallet connected! 🎉');
      },
      onCancel: () => {
        toast.error('Connection cancelled');
      },
    });
  };

  /**
   * Clears the Stacks session and resets local address state.
   */
  const disconnectWallet = () => {
    disconnect();
    setAddress(null);
    toast('Wallet disconnected', { icon: '👋' });
  };

  const value = {
    address,
    connectWallet,
    disconnectWallet,
    appDetails,
    isConnected: !!address,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

WalletProvider.propTypes = {
  children: PropTypes.node.isRequired
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
