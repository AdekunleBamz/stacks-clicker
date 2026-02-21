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

  // Mock Social Data
  const [players] = useState([
    { address: 'SP1...A2B', clicks: 12500, level: 42 },
    { address: 'SP3...X9Y', clicks: 8420, level: 28 },
    { address: 'SP2...K7L', clicks: 5100, level: 19 },
    { address: 'SP5...M3N', clicks: 3200, level: 12 },
    { address: 'SP4...Q1P', clicks: 1500, level: 5 }
  ]);

  const [activities, setActivities] = useState([
    { id: 1, user: 'SP1...A2B', text: 'just clicked 5 times!', type: 'click', time: 'Just now' },
    { id: 2, user: 'SP3...X9Y', text: 'sent a 0.5 STX tip!', type: 'tip', time: '2m ago' },
    { id: 3, user: 'DEGEN', text: 'voted YES on Poll #4!', type: 'poll', time: '5m ago' }
  ]);

  // Mock User Data for Progress Dashboard
  const [userData, setUserData] = useState({
    level: 12,
    xp: 2450,
    nextLevelXP: 5000,
    stats: {
      totalTipped: 0.0452,
      clickRate: 3.4,
      totalStreaks: 156,
      rank: '#42'
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

              <aside className="right-column">
                <Leaderboard players={players} />
                <SocialFeed activities={activities} />
              </aside>
            </motion.div>
          )}
        </AnimatePresence>

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
