import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WalletProvider, useWallet } from './context/WalletContext';
import ConnectButton from './components/ConnectButton';
import WalletConnectQRModal from './components/WalletConnectQRModal';
import ClickerGame from './components/ClickerGame';
import TipJar from './components/TipJar';
import QuickPoll from './components/QuickPoll';
import TransactionLog from './components/TransactionLog';
import Toast from './components/Toast';
import BackgroundParticles from './components/BackgroundParticles';

/**
 * Main application component for the Stacks Clicker v2.
 * Orchestrates global state, blockchain interactions, theme management, and responsive layout.
 * Acts as the centralized hub for transaction logging and aesthetic feedback.
 *
 * @component
 * @returns {JSX.Element} The root application UI tree
 */
export default function App() {
  const stacksNetwork = (import.meta.env.VITE_STACKS_NETWORK || 'mainnet').toLowerCase();

  // Global Contexts
  const { address } = useWallet();
  const { lang, setLang } = useI18n();
  const { playSound } = useSound();

  // Application State
  const [txLog, setTxLog] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [isAudioOpen, setIsAudioOpen] = useState(false);

  // Theme Management (Persisted via LocalStorage)
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  /**
   * Effect to synchronize the HTML data-theme attribute with the current application theme.
   */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /**
   * Toggles between 'light' and 'dark' themes.
   */
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  /**
   * Adds a transaction record to the local session log and triggers UI notifications.
   *
   * @param {string} action - Human-readable label for the interaction (e.g., '🎯 Click')
   * @param {string} txId - The unique transaction hash returned from the Stacks network
   * @param {string} [status='success'] - Current lifecycle state of the transaction
   * @returns {Object} The formatted transaction object
   */
  const addTxToLog = useCallback(
    (action, txId, status = 'success') => {
      const submittedAt = new Date();
      const isPending = !txId || status === 'pending';
      const tx = {
        id: txId || `pending-${Date.now()}`,
        action,
        status,
        time: submittedAt.toLocaleTimeString(),
        submittedAt: submittedAt.toISOString(),
        network: stacksNetwork,
        explorerUrl: isPending ? null : `https://explorer.hiro.so/txid/${txId}?chain=${stacksNetwork}`,
        isPending,
      };
      setTxLog((prev) => [tx, ...prev.slice(0, 49)]); // Maintain last 50 TXs
      setParticleTrigger((prev) => prev + 1);
      playSound('success');

      notify.custom(`${action} submitted!`, action.split(' ')[0]);
      return tx;
    },
    [playSound, stacksNetwork]
  );

  /**
   * Unified interaction interface provided by the useInteractions collector.
   * Centralizes callbacks for all game-related contract calls.
   */
  const { clicker, tipjar, quickpoll, pingAll } = useInteractions({
    onTxSubmit: (action, txId) => {
      addTxToLog(action, txId);
      // Update local reactive stats for immediate feedback (optimistic logic)
      const actionLower = action.toLowerCase();
      const type = ['click', 'tip', 'vote'].find(t => actionLower.includes(t));
      if (type) {
        setStats(prev => ({ ...prev, [`${type}s`]: prev[`${type}s`] + 1 }));
      }
    ]
  });

  // Show toast notification
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  // Handle transaction submission
  const handleTxSubmit = useCallback((action, txId) => {
    const tx = {
      id: txId || `pending - ${Date.now()} `,
      action,
      status: txId ? 'pending' : 'submitted',
      time: new Date().toLocaleTimeString()
    };
    setTxLog(prev => [tx, ...prev.slice(0, 49)]);
    showToast(`${action} submitted! 🚀`, 'success');
  }, [showToast]);

  return (
    <div className="app">
      <BackgroundParticles />

      {/* Header */}
      <header className="header" role="banner">
        <div className="header-content">
          <div className="logo" aria-label="StacksClicker Logo">
            <span className="logo-icon" aria-hidden="true">🎮</span>
            <h1>StacksClicker</h1>
          </div>
          <ConnectButton />
        </div>
      </header>

      <AudioSettings
        isOpen={isAudioOpen}
        onClose={() => setIsAudioOpen(false)}
        settings={settings}
        onUpdate={updateSetting}
      />

      {/* Main Content */}
      <main className="main" role="main">
        {!isConnected ? (
          <div className="welcome-screen">
            <h2>Welcome to StacksClicker!</h2>
            <p>Connect your wallet to start playing</p>
            <div className="features">
              <div className="feature">
                <span>🎮</span>
                <h3>Clicker Game</h3>
                <p>Build click streaks and compete for the highest score</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="games"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="games-grid"
            >
              <ClickerGame onTxSubmit={handleTxSubmit} />
              <TipJar onTxSubmit={handleTxSubmit} />
              <QuickPoll onTxSubmit={handleTxSubmit} />
            </motion.div>
          )}
        </AnimatePresence>

              <ProgressDashboard userData={userData} />
            </motion.div>
          )}
        </AnimatePresence>

      {/* Footer */}
      <footer className="footer">
        <p>Built on Stacks • Powered by Clarity</p>
        <div className="footer-links">
          <a
            href="https://explorer.hiro.so/address/SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N?chain=mainnet"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Contracts
          </a>
          <a
            href="https://github.com/AdekunleBamz/stacks-clicker"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </footer>

        <main id="main-content" className="app-main" role="main" tabIndex={-1} style={{ outline: 'none' }}>
          <React.Suspense fallback={<SkeletonLoader height="500px" borderRadius="32px" />}>
            <MainGrid
              address={address}
              stats={stats}
              clicker={clicker}
              tipjar={tipjar}
              quickpoll={quickpoll}
            />
          </React.Suspense>

          <React.Suspense fallback={<SkeletonLoader height="400px" borderRadius="32px" />}>
            <TransactionHistory txLog={txLog} />
          </React.Suspense>
        </main>
      </div>

      <Footer />
      <OnboardingTour />
      <FloatingActionButton />
      <NetworkHeartbeat />
      <QuickActions address={address} onClearLog={() => setTxLog([])} onPingAll={pingAll} />

      <Toaster position="top-right" />
      <ParticleOverlay trigger={particleTrigger} />
      <React.Suspense fallback={null}>
        <MilestoneCelebration celebration={celebration} />
      </React.Suspense>
    </div>
  );
}
