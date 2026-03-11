import React, { useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';

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
  const [copied, setCopied] = useState(false);

  /**
   * Copies the full address to the system clipboard and provides visual feedback.
   */
  const handleCopy = useCallback(() => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast.success('Address copied!');
    setTimeout(() => setCopied(false), 2000);
  }, [address]);

  if (!address) return null;

  return (
    <div className="wallet-info">
      <button
        className="address-badge"
        onClick={handleCopy}
        title="Click to copy full address"
        aria-label="Copy wallet address"
      >
        <span className="address-text">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <span className="copy-icon" aria-hidden="true">
          {copied ? '✅' : '📋'}
        </span>
      </button>
      {onDisconnect && (
        <button
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
