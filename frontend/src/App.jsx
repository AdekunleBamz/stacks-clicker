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
 * Main App Content (inside WalletProvider)
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

  // Simulate live community activity
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      const users = ['SP2...K7L', 'SP4...Q1P', 'DEGEN', 'ANON', 'WHALE'];
      const actions = [
        { text: 'is on a clicking spree!', type: 'click' },
        { text: 'just tipped 0.01 STX', type: 'tip' },
        { text: 'reached Level 10!', type: 'streak' },
        { text: 'created a new poll', type: 'poll' }
      ];

      const user = users[Math.floor(Math.random() * users.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];

      const newActivity = {
        id: Date.now(),
        user,
        text: action.text,
        type: action.type,
        time: 'Just now'
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 8000);

    return () => clearInterval(interval);
  }, [isConnected]);

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
    achievements: [
      {
        icon: '🔥',
        title: 'Hot Streak',
        description: 'Reached a 100-click streak without stopping',
        unlocked: true,
        date: '2025-05-15'
      },
      {
        icon: '💎',
        title: 'Early Supporter',
        description: 'Connected your wallet during the alpha phase',
        unlocked: true,
        date: '2025-05-10'
      },
      {
        icon: '👑',
        title: 'Whale Tipper',
        description: 'Sent more than 1 STX in total tips',
        unlocked: false
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

        {/* Transaction Log */}
        <TransactionLog transactions={txLog} />
      </main>

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

      {/* QR Modal for WalletConnect */}
      {showQRModal && (
        <WalletConnectQRModal uri={wcUri} onClose={closeQRModal} />
      )}

      {/* Toast Notifications */}
      <Toast toasts={toasts} />
    </div>
  );
}

/**
 * App wrapper with WalletProvider
 */
export default function App() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
}
