import React, { useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useMedia } from '../../hooks/useMedia';
import { useClipboard } from '../../hooks/useClipboard';

/**
 * Component for displaying a truncated Stacks wallet address with copy-to-clipboard functionality.
 * Provides a clean UI for address identification and optional session management.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.address - The full Stacks address to be truncated and displayed
 * @param {Function} [props.onDisconnect] - Optional callback to trigger wallet disconnection
 * @returns {JSX.Element|null} The rendered address badge or null if no address is provided
 */
function AddressBadge({ address, onDisconnect }) {
  const isMobile = useMedia('(max-width: 480px)');
  const { copied, copyToClipboard } = useClipboard();

  /**
   * Copies the full address to the system clipboard and provides visual feedback.
   */
  const handleCopy = useCallback(() => {
    copyToClipboard(address);
  }, [address, copyToClipboard]);

  if (!address) return null;

  return (
    <div className="wallet-info" role="region" aria-label="Wallet Connection Status">
      <button
        type="button"
        className="address-badge-btn"
        aria-keyshortcuts="c"
        onClick={handleCopy}
        title="Copy full wallet address to clipboard"
        aria-label="Copy wallet address"
      >
        <span className="address-text">
          {isMobile 
            ? `${address.slice(0, 4)}...${address.slice(-3)}` 
            : `${address.slice(0, 6)}...${address.slice(-4)}`}
        </span>
        <span className="copy-icon" aria-hidden="true" aria-live="polite">
          {copied ? '✅' : '📋'}
        </span>
      </button>
      {onDisconnect && (
        <button
          type="button"
          className="btn-disconnect"
          onClick={onDisconnect}
          aria-label="Disconnect wallet"
        >
          Disconnect
        </button>
      )}
    </div>
  );
}

AddressBadge.propTypes = {
  address: PropTypes.string.isRequired,
  onDisconnect: PropTypes.func
};

export default memo(AddressBadge);
