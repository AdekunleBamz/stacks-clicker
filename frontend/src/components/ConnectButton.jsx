import React from 'react';
import { useWallet } from '../context/WalletContext';

/**
 * Wallet connection button component
 * Shows connect/disconnect based on connection state
 */
export default function ConnectButton() {
  const { address, connectWallet, disconnectWallet } = useWallet();

  // Format address for display
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (address) {
    return (
      <div className="wallet-connected">
        <span className="wallet-address" title={address}>
          {formatAddress(address)}
        </span>
        <button className="disconnect-btn" onClick={disconnectWallet} title="Disconnect wallet">
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
