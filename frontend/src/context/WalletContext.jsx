import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { showConnect, disconnect } from '@stacks/connect';
import toast from 'react-hot-toast';

const WalletContext = createContext(null);

const appDetails = {
  name: 'StacksClicker',
  icon: window.location.origin + '/favicon.svg',
};

export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null);

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
      console.log('No existing connection');
    }
  }, []);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

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
