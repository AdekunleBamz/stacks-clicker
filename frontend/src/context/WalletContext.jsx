import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  initProvider, 
  wcConnect, 
  wcDisconnect, 
  getAddresses, 
  isConnected,
  getSession
} from '../utils/walletconnect';

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [wcUri, setWcUri] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);

  // Initialize provider and check for existing session on mount
  useEffect(() => {
    async function init() {
      try {
        await initProvider();
        
        // Check for existing session
        if (isConnected()) {
          const { address: addr, publicKey: pk } = await getAddresses();
          setAddress(addr);
          setPublicKey(pk);
        }
      } catch (err) {
        console.error('Failed to init provider:', err);
      }
    }
    init();
  }, []);

  // Connect wallet
  const connectWallet = useCallback(async () => {
    setConnecting(true);
    setError(null);
    setWcUri(null);

    try {
      // Start connection - will trigger QR modal
      const session = await wcConnect((uri) => {
        setWcUri(uri);
        setShowQRModal(true);
      });

      // Close QR modal on successful connection
      setShowQRModal(false);
      setWcUri(null);

      // Fetch addresses with timeout handling
      try {
        const { address: addr, publicKey: pk } = await getAddresses();
        setAddress(addr);
        setPublicKey(pk);
      } catch (addrErr) {
        // Fallback: session is connected but getAddresses failed
        // This can happen with some wallets
        console.warn('getAddresses failed, using session fallback');
        const session = getSession();
        if (session?.namespaces?.stacks?.accounts?.[0]) {
          const account = session.namespaces.stacks.accounts[0];
          const parts = account.split(':');
          setAddress(parts[parts.length - 1]);
        }
      }

    } catch (err) {
      console.error('Connection failed:', err);
      setError(err.message);
      setShowQRModal(false);
    } finally {
      setConnecting(false);
    }
  }, []);

  // Disconnect wallet
  const disconnectWallet = useCallback(async () => {
    try {
      await wcDisconnect();
    } catch (err) {
      console.error('Disconnect error:', err);
    }
    setAddress(null);
    setPublicKey(null);
    setWcUri(null);
    setShowQRModal(false);
  }, []);

  // Close QR modal
  const closeQRModal = useCallback(() => {
    setShowQRModal(false);
  }, []);

  const value = {
    address,
    publicKey,
    connecting,
    error,
    wcUri,
    showQRModal,
    connectWallet,
    disconnectWallet,
    closeQRModal,
    isConnected: !!address
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
}

export default WalletContext;
