import React, { useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useMedia } from '../../hooks/useMedia';
import { useClipboard } from '../../hooks/useClipboard';
import { truncateAddress } from '../../utils/format';

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
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        className="address-badge-btn secondary-button glass-card"
        onClick={handleCopy}
        title={`Copy full Stacks address: ${address}`}
        aria-label={`Copy wallet address ${truncateAddress(address, 4)}`}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <span className="address-text" aria-hidden="true">
          {truncateAddress(address, isMobile ? 4 : 6)}
        </span>
        <div className="copy-status-container" style={{ width: '20px', display: 'flex', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                role="status"
                aria-live="polite"
              >
                ✅
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                aria-hidden="true"
              >
                📋
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
      {onDisconnect && (
        <button
          type="button"
          className="btn-disconnect ghost-button btn-sm"
          onClick={onDisconnect}
          aria-label="Disconnect wallet session"
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
