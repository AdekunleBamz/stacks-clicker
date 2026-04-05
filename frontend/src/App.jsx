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
function AppContent() {
  const { wcUri, showQRModal, closeQRModal, isConnected } = useWallet();
  const { settings, updateSetting } = useAudio();
  const [txLog, setTxLog] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [isAudioOpen, setIsAudioOpen] = useState(false);

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
    [configuredNetwork, playSound]
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
