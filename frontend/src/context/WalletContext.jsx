import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import {
  getAddresses,
  initProvider,
  isValidProjectId,
  wcConnect,
  wcDisconnect,
} from '../utils/walletconnect';

/**
 * @typedef {Object} WalletContextValue
 * @property {string|null} address - The current Stacks mainnet address of the connected user
 * @property {Function} connectWallet - Function to trigger the WalletConnect pairing flow
 * @property {Function} disconnectWallet - Function to clear the active WalletConnect session
 * @property {Object} appDetails - Metadata for the Stacks connection (name, icon)
 * @property {boolean} isConnected - Computed boolean indicating if a wallet is currently linked
 * @property {string|null} walletConnectUri - Current WalletConnect pairing URI, shown as QR
 * @property {Function} closeWalletConnectModal - Function to hide the pairing QR modal
 */

/** @type {React.Context<WalletContextValue|null>} */
const WalletContext = createContext(null);

function getAppDetails() {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return {
    name: 'StacksClicker',
    icon: `${origin}/favicon.svg`,
  };
}

/**
 * Provider component that manages the global Stacks wallet state and authentication lifecycle.
 * Integrates with WalletConnect for Stacks wallet interactions.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Application components requiring wallet access
 * @returns {JSX.Element} The WalletContext provider wrapping child components
 */
export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletConnectUri, setWalletConnectUri] = useState(null);

  const checkConnection = useCallback(async () => {
    if (typeof window === 'undefined') {
      setAddress(null);
      return;
    }

    if (!isValidProjectId()) {
      setAddress(null);
      return;
    }

    try {
      await initProvider();
      const account = await getAddresses();
      setAddress(account.address.trim());
    } catch (error) {
      setAddress(null);
    }
  }, []);

  useEffect(() => {
    void checkConnection();
  }, [checkConnection]);

  const connectWallet = useCallback(async () => {
    if (!isValidProjectId()) {
      toast.error('WalletConnect project ID is not configured');
      return;
    }

    setIsConnecting(true);
    setWalletConnectUri(null);

    try {
      await wcConnect((uri) => setWalletConnectUri(uri));
      const account = await getAddresses();
      setAddress(account.address.trim());
      setWalletConnectUri(null);
      toast.success('Wallet connected!');
    } catch (error) {
      toast.error(error?.message || 'Wallet connection failed');
      setAddress(null);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    await wcDisconnect();
    setWalletConnectUri(null);
    setAddress(null);
    toast('Wallet disconnected');
  }, []);

  const closeWalletConnectModal = useCallback(() => {
    setWalletConnectUri(null);
  }, []);

  const appDetails = useMemo(() => getAppDetails(), []);

  const value = useMemo(
    () => ({
      address,
      connectWallet,
      disconnectWallet,
      appDetails,
      isConnected: !!address,
      isConnecting,
      walletConnectUri,
      closeWalletConnectModal,
    }),
    [
      address,
      connectWallet,
      disconnectWallet,
      appDetails,
      isConnecting,
      walletConnectUri,
      closeWalletConnectModal,
    ]
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
