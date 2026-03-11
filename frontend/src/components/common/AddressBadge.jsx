import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';

/**
 * Component for displaying a truncated Stacks address.
 *
 * @param {Object} props - Component props.
 * @param {string} props.address - The Stacks address to display.
 * @param {Function} [props.onDisconnect] - Optional disconnect callback.
 */
export default function AddressBadge({ address, onDisconnect }) {
  const [copied, setCopied] = useState(false);

  if (!address) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast.success('Address copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="wallet-info">
      <button
        className="address-badge"
        onClick={handleCopy}
        title="Click to copy address"
        aria-label="Copy address"
      >
        {address.slice(0, 6)}...{address.slice(-4)}
        <span className="copy-icon" aria-hidden="true">{copied ? '✅' : '📋'}</span>
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
