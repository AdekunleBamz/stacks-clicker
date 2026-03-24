import React from 'react';
import { useWallet } from '../context/WalletContext';
import { truncateAddress } from '../utils/format';
import { useMedia } from '../hooks/useMedia';

/**
 * Wallet connection button component
 * Shows connect/disconnect based on connection state
 */
export default function ConnectButton() {
  const { address, connectWallet, disconnectWallet } = useWallet();

  const isMobile = useMedia('(max-width: 480px)');

  if (address) {
    return (
      <div className="wallet-connected" role="region" aria-label="Wallet connection info">
        <span className="wallet-address glass-card" title={`Full Stacks address: ${address}`} aria-label={`Connected address ${truncateAddress(address, 4)}`}>
          {truncateAddress(address, isMobile ? 4 : 6)}
        </span>
        <button
          type="button"
          className="disconnect-btn secondary-button btn-sm"
          onClick={disconnectWallet}
          aria-label="Disconnect Stacks Wallet"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="connect-btn primary-button"
      onClick={connectWallet}
      aria-label="Connect Stacks Wallet"
    >
      Connect Wallet
    </button>
  );
}
