import React from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '../context/WalletContext';

/**
 * Wallet connection button component
 * Shows connect/disconnect based on connection state
 */
export default function ConnectButton() {
  const {
    address,
    connecting,
    connectWallet,
    disconnectWallet
  } = useWallet();

  // Format address for display
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (connecting) {
    return (
      <motion.button
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="connect-btn connecting"
        disabled
      >
        <span className="spinner"></span>
        Connecting...
      </motion.button>
    );
  }

  if (address) {
    return (
      <div className="wallet-connected">
        <span className="wallet-address" title={address}>
          {formatAddress(address)}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="disconnect-btn"
          onClick={disconnectWallet}
          title="Disconnect wallet"
        >
          Disconnect
        </motion.button>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="connect-btn"
      onClick={connectWallet}
    >
      Connect Wallet
    </motion.button>
  );
}
