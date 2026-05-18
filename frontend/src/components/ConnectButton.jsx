import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../context/WalletContext';
import { truncateAddress } from '../utils/format';
import { useMedia } from '../hooks/useMedia';

const connectedInitial = { opacity: 0, x: 20 };
const connectedAnimate = { opacity: 1, x: 0 };
const connectedExit = { opacity: 0, x: 20 };
const addrHover = { scale: 1.05 };
const disconnectHover = { scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.1)' };
const disconnectTap = { scale: 0.95 };
const connectInitial = { opacity: 0, scale: 0.9 };
const connectAnimate = { opacity: 1, scale: 1 };
const connectExit = { opacity: 0, scale: 0.9 };
const connectHover = { scale: 1.05, translateY: -2 };
const connectTap = { scale: 0.95 };

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
   * Opens the user's installed Stacks wallet.
   */
  const handleConnect = useCallback(() => {
    setAnnouncement('Opening Stacks wallet connection...');
    connectWallet();
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
            initial={connectedInitial}
            animate={connectedAnimate}
            exit={connectedExit}
            className="wallet-connected"
            role="region"
            aria-label="Wallet connection info"
            aria-live="polite"
          >
            <motion.span
              whileHover={addrHover}
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
              whileHover={disconnectHover}
              whileTap={disconnectTap}
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
            initial={connectInitial}
            animate={connectAnimate}
            exit={connectExit}
            whileHover={connectHover}
            whileTap={connectTap}
            type="button"
            className="connect-btn primary-button"
            onClick={handleConnect}
            aria-label="Connect Stacks Wallet"
            title="Connect Stacks wallet"
            aria-busy={isConnecting}
            disabled={isConnecting}
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
