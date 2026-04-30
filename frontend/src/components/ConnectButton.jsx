import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../context/WalletContext';
import { truncateAddress } from '../utils/format';
import { useMedia } from '../hooks/useMedia';

/**
 * Wallet connection button component with enhanced accessibility
 * Shows connect/disconnect based on connection state
 *
 * @component
 * @returns {JSX.Element} The wallet connection button
 *
 * @example
 * ```jsx
 * <ConnectButton />
 * ```
 */
export default function ConnectButton() {
  const { address, connectWallet, disconnectWallet, isConnecting } = useWallet();
  const [announcement, setAnnouncement] = useState('');
  const isMobile = useMedia('(max-width: 480px)');

  /**
   * Handles wallet connection with accessibility announcements
   */
  const handleConnect = useCallback(async () => {
    setAnnouncement('Connecting wallet, please wait...');
    try {
      await connectWallet();
      setAnnouncement('Wallet connected successfully');
    } catch (error) {
      setAnnouncement('Failed to connect wallet. Please try again.');
    }
  }, [connectWallet]);

  /**
   * Handles wallet disconnection with accessibility announcements
   */
  const handleDisconnect = useCallback(() => {
    setAnnouncement('Disconnecting wallet...');
    disconnectWallet();
    setAnnouncement('Wallet disconnected');
  }, [disconnectWallet]);

  // Clear announcement after 3 seconds
  useEffect(() => {
    if (announcement) {
      const timer = setTimeout(() => setAnnouncement(''), 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [announcement]);

  return (
    <div className="connect-button-container">
      {/* Screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        data-testid="wallet-announcement"
      >
        {announcement}
      </div>

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
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="wallet-address glass-card"
              title={`Full Stacks address: ${address}`}
              aria-label={`Connected address ${truncateAddress(address, { prefix: 4 })}`}
              tabIndex={0}
              role="status"
              aria-live="polite"
            >
              {truncateAddress(address, isMobile ? { prefix: 4 } : { prefix: 6 })}
            </motion.span>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="disconnect-btn secondary-button btn-sm"
              onClick={handleDisconnect}
              aria-label="Disconnect Stacks Wallet"
              title="Disconnect Stacks wallet"
              aria-describedby="disconnect-description"
              aria-busy={isConnecting}
              disabled={isConnecting}
            >
              Disconnect
            </motion.button>
            <span id="disconnect-description" className="sr-only">
              Click to disconnect your Stacks wallet from the application
            </span>
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
            onClick={handleConnect}
            aria-label={isConnecting ? 'Connecting wallet...' : 'Connect Stacks Wallet'}
            title={isConnecting ? 'Connecting wallet' : 'Connect Stacks wallet'}
            aria-haspopup="dialog"
            aria-busy={isConnecting}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <span className="connect-loading">
                <span className="spinner" aria-hidden="true"></span>
                Connecting...
              </span>
            ) : (
              'Connect Wallet'
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
