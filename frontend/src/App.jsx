import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PlayerStats from './components/PlayerStats';
import TransactionHistory from './components/TransactionHistory';
import ClickerCard from './components/ClickerCard';
import TipJarCard from './components/TipJarCard';
import QuickPollCard from './components/QuickPollCard';
import { useWallet } from './context/WalletContext';
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

  // Application State
  const [txLog, setTxLog] = useState([]);
  const [stats, setStats] = useState({ clicks: 0, tips: 0, votes: 0 });
  const [particleTrigger, setParticleTrigger] = useState(0);

  // Add transaction to log
  const addTxToLog = (action, txId, status = 'success') => {
    const tx = {
      id: txId || `pending-${Date.now()}`,
      action,
      status,
      time: new Date().toLocaleTimeString(),
    };
    setTxLog((prev) => [tx, ...prev.slice(0, 49)]);
    setParticleTrigger(prev => prev + 1);
    toast.success(`${action} submitted!`, {
      icon: action.split(' ')[0], // Use the emoji from action
      style: {
        borderRadius: '12px',
        background: '#1e1b4b',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.1)'
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
