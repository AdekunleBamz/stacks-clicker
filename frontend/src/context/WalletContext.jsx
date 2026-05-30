import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import Modal from '../components/common/Modal';
import {
  connectStacksWallet,
  disconnectStacksWallet,
  getAddresses,
  isConnected as isStacksConnected,
} from '../utils/stacksWallet';

/**
 * @typedef {Object} WalletContextValue
 * @property {string|null} address - The current Stacks mainnet address of the connected user
 * @property {Function} connectWallet - Function to connect a native Stacks wallet
 * @property {Function} disconnectWallet - Function to clear the active Stacks wallet session
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
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Application components requiring wallet access
 * @returns {JSX.Element} The WalletContext provider wrapping child components
 */
export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWalletPickerOpen, setIsWalletPickerOpen] = useState(false);

  const checkConnection = useCallback(async () => {
    if (typeof window === 'undefined' || !isStacksConnected()) return;
    try {
      const account = await getAddresses();
      setAddress(account.address.trim());
    } catch {
      // no restorable Stacks wallet session
    }
  }, []);

  useEffect(() => {
    void checkConnection();
  }, [checkConnection]);

  const connectNativeWallet = useCallback(async () => {
    setIsConnecting(true);

    try {
      setIsWalletPickerOpen(false);
      const account = await connectStacksWallet();
      setAddress(account.address.trim());
      toast.success('Wallet connected!');
    } catch (error) {
      toast.error(error?.message || 'Wallet connection failed');
      setAddress(null);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const connectWallet = useCallback(() => {
    setIsWalletPickerOpen(true);
  }, []);

  const closeWalletPicker = useCallback(() => {
    if (!isConnecting) {
      setIsWalletPickerOpen(false);
    }
  }, [isConnecting]);

  const disconnectWallet = useCallback(async () => {
    disconnectStacksWallet();
    setAddress(null);
    toast('Wallet disconnected');
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
    }),
    [address, connectWallet, disconnectWallet, appDetails, isConnecting]
  );

  return (
    <WalletContext.Provider value={value}>
      {children}
      <Modal
        isOpen={isWalletPickerOpen}
        onClose={closeWalletPicker}
        title="Connect a Wallet"
        maxWidth="420px"
      >
        <div className="wallet-picker-options">
          <p className="wallet-picker-copy">
            Choose a Stacks wallet provider to continue.
          </p>
          <button
            type="button"
            className="primary-button wallet-picker-option"
            onClick={connectNativeWallet}
            disabled={isConnecting}
            aria-busy={isConnecting}
          >
            {isConnecting ? 'Opening wallet...' : 'Hiro Wallet / Leather'}
          </button>
          <a
            className="secondary-button wallet-picker-option"
            href="https://www.xverse.app/download"
            target="_blank"
            rel="noopener noreferrer"
          >
            Xverse Wallet
          </a>
        </div>
      </Modal>
    </WalletContext.Provider>
  );
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
