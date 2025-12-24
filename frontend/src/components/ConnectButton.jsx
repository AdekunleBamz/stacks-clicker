import React from 'react';
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
      <button className="connect-btn connecting" disabled>
        <span className="spinner"></span>
        Connecting...
      </button>
    );
  }

  if (address) {
    return (
      <div className="wallet-connected">
        <span className="wallet-address" title={address}>
          {formatAddress(address)}
        </span>
        <button 
          className="disconnect-btn" 
          onClick={disconnectWallet}
          title="Disconnect wallet"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button className="connect-btn" onClick={connectWallet}>
      Connect Wallet
    </button>
  );
}
