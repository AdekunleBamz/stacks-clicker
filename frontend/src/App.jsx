import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import PlayerStats from './components/PlayerStats';
import TransactionHistory from './components/TransactionHistory';
import ClickerCard from './components/ClickerCard';
import TipJarCard from './components/TipJarCard';
import QuickPollCard from './components/QuickPollCard';
import { useWallet } from './context/WalletContext';
import { useSound } from './hooks/useSound';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleOverlay from './components/common/ParticleOverlay';

// Hooks
import { useClicker } from './hooks/useClicker';
import { useTipJar } from './hooks/useTipJar';
import { useQuickPoll } from './hooks/useQuickPoll';

/**
 * Main application component for the Stacks Transaction Hub.
 * Manages global state, contract interaction via custom hooks, and UI layout.
 * @returns {JSX.Element} The rendered application.
 */
export default function App() {
  // Global Wallet State
  const { address, connectWallet, disconnectWallet } = useWallet();
  const { playSound: play } = useSound();

  // Application State
  const [txLog, setTxLog] = useState([]);
  const [stats, setStats] = useState({ clicks: 0, tips: 0, votes: 0 });
  const [particleTrigger, setParticleTrigger] = useState(0);

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

  // Synchronize SoundEngine with settings
  useEffect(() => {
    soundEngine.setSettings(settings);
  }, [settings]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle Mute with 'M' key
      if (e.key.toLowerCase() === 'm' && !isAudioOpen) {
        const isMuted = settings.masterVolume === 0;
        updateSetting('masterVolume', isMuted ? 0.5 : 0);
        showToast(isMuted ? 'Audio Unmuted 🔊' : 'Audio Muted 🔇', 'info');
        soundEngine.play(isMuted ? 'success' : 'click');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [settings.masterVolume, updateSetting, showToast, isAudioOpen]);

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
    });
    return tx;
  };

  // Initialize Hooks
  const clicker = useClicker({
    onTxSubmit: (action, txId) => {
      addTxToLog('🎯 Click', txId);
      setStats(prev => ({ ...prev, clicks: prev.clicks + 1 }));
    }
  });

  const tipjar = useTipJar({
    onTxSubmit: (action, txId) => {
      addTxToLog('💰 Tip', txId);
      setStats(prev => ({ ...prev, tips: prev.tips + 1 }));
    }
  });

  const quickpoll = useQuickPoll({
    onTxSubmit: (action, txId) => {
      addTxToLog('🗳️ Vote', txId);
      setStats(prev => ({ ...prev, votes: prev.votes + 1 }));
    }
  });

  // Keyboard Shortcuts
  useState(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in an input
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

      if (e.key.toLowerCase() === 'c') {
        clicker.click();
      }
      if (e.key.toLowerCase() === 't') {
        tipjar.quickTip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Milestone Celebration
  const [celebration, setCelebration] = useState(null);
  useState(() => {
    const milestones = [10, 50, 100, 500];
    const checkMilestones = () => {
      const total = stats.clicks + stats.tips + stats.votes;
      if (milestones.includes(total)) {
        setCelebration(`Level Up: ${total} Interactions!`);
        setParticleTrigger(prev => prev + 5); // Massive burst
        setTimeout(() => setCelebration(null), 3000);
      }
    };
    checkMilestones();
  }, [stats]);

  return (
    <div className="app-container" data-theme={theme} role="application" aria-roledescription="web application">
      <a
        href="#main-content"
        className="skip-link"
        aria-label="Skip navigation and jump to primary content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main-content')?.focus();
        }}
      >
        Skip to main content
      </a>
      <PerformanceOverlay />
      <ScrollToTop />

      {/* Screen reader only announcement for high-frequency updates */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {txLog.length > 0 ? `Latest action: ${txLog[0].action}` : ''}
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

      <AnimatePresence>
        {celebration && (
          <motion.div
            className="milestone-celebration"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
          >
            <div className="milestone-text">{celebration}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <motion.div
              className="logo-glow"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2L4 16L16 30L28 16L16 2Z" fill="url(#logo-grad)" />
                <path d="M16 6L8 16L16 26L24 16L16 6Z" fill="white" fillOpacity="0.2" />
                <defs>
                  <linearGradient id="logo-grad" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366f1" />
                    <stop offset="1" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            <span className="logo-text">Stacks Clicker V2</span>
          </div>

          <div className="wallet-section">
            {address ? (
              <div className="wallet-info">
                <span className="address-badge">{address.slice(0, 6)}...{address.slice(-4)}</span>
                <button className="btn-disconnect" onClick={disconnectWallet}>Disconnect</button>
              </div>
            ) : (
              <button className="btn-connect" onClick={connectWallet}>Connect Wallet</button>
            )}
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="main-grid">
          <section className="interaction-section">
            <h2 className="section-title">Interactions</h2>
            <div className="cards-container">
              <ClickerCard address={address} clicker={clicker} />
              <TipJarCard address={address} tipjar={tipjar} />
              <QuickPollCard address={address} quickpoll={quickpoll} />
            </div>
          </section>

          <aside className="stats-aside">
            <PlayerStats stats={stats} />
            <TransactionHistory txLog={txLog} />
          </aside>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with ❤️ on Stacks</p>
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
