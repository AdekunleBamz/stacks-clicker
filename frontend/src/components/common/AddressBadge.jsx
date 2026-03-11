import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for displaying a truncated Stacks address.
 *
 * @param {Object} props - Component props.
 * @param {string} props.address - The Stacks address to display.
 * @param {Function} [props.onDisconnect] - Optional disconnect callback.
 */
export default function AddressBadge({ address, onDisconnect }) {
  if (!address) return null;

  return (
    <div className="wallet-info">
      <span className="address-badge" title={address}>
        {address.slice(0, 6)}...{address.slice(-4)}
      </span>
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
