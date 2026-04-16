import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  return (
    <AnimatePresence mode="wait">
      {address ? (
        <motion.div
          key="connected"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="wallet-connected"
          role="region"
          aria-label="Wallet connection info"
          aria-live="polite"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="wallet-address glass-card"
            title={`Full Stacks address: ${address}`}
            aria-label={`Connected address ${truncateAddress(address, { prefix: 4 })}`}
          >
            {truncateAddress(address, isMobile ? { prefix: 4 } : { prefix: 6 })}
          </motion.span>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="disconnect-btn secondary-button btn-sm"
            onClick={disconnectWallet}
            aria-label="Disconnect Stacks Wallet"
          >
            Disconnect
          </motion.button>
        </motion.div>
      ) : (
        <motion.button
          key="connect"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          whileHover={{ scale: 1.05, translateY: -2 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="connect-btn primary-button"
          onClick={connectWallet}
          aria-label="Connect Stacks Wallet"
          aria-haspopup="dialog"
        >
          Connect Wallet
        </motion.button>
      )}
    </AnimatePresence>
  );
}
