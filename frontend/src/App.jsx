import React, { useState, useCallback, useEffect } from 'react';
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
import ProgressDashboard from './components/ProgressDashboard';
import Leaderboard from './components/Leaderboard';
import SocialFeed from './components/SocialFeed';
import AudioSettings from './components/AudioSettings';
import { useAudio } from './context/AudioContext';
import soundEngine from './utils/SoundEngine';

/**
 * Main application component for the Stacks Clicker v2.
 * Orchestrates global state, blockchain interactions, theme management, and responsive layout.
 * Acts as the centralized hub for transaction logging and aesthetic feedback.
 *
 * @component
 * @returns {JSX.Element} The root application UI tree
 */
function AppContent() {
  const { wcUri, showQRModal, closeQRModal, isConnected } = useWallet();
  const { settings, updateSetting } = useAudio();
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
        network: configuredNetwork,
        explorerUrl: isPending ? null : `https://explorer.hiro.so/txid/${txId}?chain=${configuredNetwork}`,
        isPending,
      };
      setTxLog((prev) => [tx, ...prev.slice(0, 49)]); // Maintain last 50 TXs
      setParticleTrigger((prev) => prev + 1);
      playSound('success');

      notify.custom(`${action} submitted!`);
      return tx;
    },
    [playSound]
  );

  /**
   * Unified interaction interface provided by the useInteractions collector.
   * Centralizes callbacks for all game-related contract calls.
   */
  const { clicker, tipjar, quickpoll, pingAll } = useInteractions({
    onTxSubmit: (action, txId) => {
      addTxToLog(action, txId);
      const normalizedAction = String(action).toLowerCase();
      
      // Determine particle intensity based on action
      let particleCount = 8;
      if (normalizedAction.includes('multi')) particleCount = 25;
      if (normalizedAction.includes('tip')) particleCount = 15;
      
      setParticleTrigger({ id: Date.now(), count: particleCount });

      // Update local reactive stats for immediate feedback (optimistic logic)
      if (action.includes('Click')) {
        setStats((prev) => ({ ...prev, clicks: prev.clicks + 1 }));
      } else if (action.includes('Tip')) {
        setStats((prev) => ({ ...prev, tips: prev.tips + 1 }));
      } else if (action.includes('Vote')) {
        setStats((prev) => ({ ...prev, votes: prev.votes + 1 }));
      }
    },
  });

  /**
   * Global keyboard accessibility shortcuts.
   * 'C' for Click, 'T' for Quick Tip.
   */
  useKeyboardShortcuts({
    isEnabled: !!address,
    actions: {
      click: clicker.click,
      tip: tipjar.tip,
    },
    playSound,
  });

  useEffect(() => {
    const handleGlobalEsc = (e) => {
      if (e.key === 'Escape') {
        setCelebration(null);
        document.getElementById('main-content')?.focus();
      }
    };
    window.addEventListener('keydown', handleGlobalEsc);
    return () => window.removeEventListener('keydown', handleGlobalEsc);
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
    <div
      className="app-container"
      data-theme={theme}
      role="application"
      aria-label="Stacks Clicker Version 2 Application"
    >
      <a
        href="#main-content"
        className="skip-link"
        aria-label="Skip navigation and jump to primary content"
        onClick={(e) => {
          e.preventDefault();
          const mainContent = document.getElementById('main-content');
          if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      >
        Skip to main content
      </a>
      <PerformanceOverlay />
      <ScrollToTop />

      {/* Header */}
      <header className="header" role="banner">
        <div className="header-content">
          <div className="logo" aria-label="StacksClicker Logo">
            <span className="logo-icon" aria-hidden="true">🎮</span>
            <h1>StacksClicker</h1>
          </div>
          <div className="header-actions">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="icon-btn"
              onClick={() => setIsAudioOpen(true)}
              aria-label="Open Audio Settings"
            >
              ⚙️
            </motion.button>
            <ConnectButton />
          </div>
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
        <AnimatePresence mode="wait">
          {!isConnected ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="welcome-screen"
            >
              <h2>Welcome to StacksClicker!</h2>
              <p>Connect your wallet to start playing</p>
              <div className="features">
                {[
                  { icon: '🎮', title: 'Clicker Game', desc: 'Build click streaks and compete for the highest score' },
                  { icon: '💰', title: 'TipJar', desc: 'Send micro-tips to support your favorite creators' },
                  { icon: '🗳️', title: 'QuickPoll', desc: 'Create and vote on community polls' }
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="feature"
                  >
                    <span>{f.icon}</span>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="games"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="main-layout-grid"
            >
              <div className="left-column">
                <div className="games-grid">
                  <ClickerGame onTxSubmit={handleTxSubmit} />
                  <TipJar onTxSubmit={handleTxSubmit} />
                  <QuickPoll onTxSubmit={handleTxSubmit} />
                </div>
                <ProgressDashboard userData={userData} />
              </div>

      <React.Suspense fallback={<SkeletonLoader height="80px" borderRadius="12px" />}>
        <Header theme={theme} toggleTheme={toggleTheme} currentLang={lang} onLangChange={setLang} />
      </React.Suspense>

      <div className="layout-content">
        <React.Suspense fallback={<SkeletonLoader height="300px" borderRadius="24px" />}>
          <PlayerStats stats={stats} txCount={txLog.length} />
        </React.Suspense>

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
