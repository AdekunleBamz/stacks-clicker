import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import QuickActions from './components/QuickActions';
import NetworkHeartbeat from './components/NetworkHeartbeat';
import OnboardingTour from './components/OnboardingTour';
import FloatingActionButton from './components/FloatingActionButton';
import InteractionStreaks from './components/InteractionStreaks';
import MainGrid from './components/MainGrid';
import MilestoneCelebration from './components/MilestoneCelebration';
import { useWallet } from './context/WalletContext';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleOverlay from './components/common/ParticleOverlay';
import PerformanceOverlay from './components/common/PerformanceOverlay';
import PullToRefresh from './components/common/PullToRefresh';
import ScrollToTop from './components/common/ScrollToTop';
import { useI18n } from './context/I18nContext';

// Hooks
import { useClicker } from './hooks/useClicker';
import { useTipJar } from './hooks/useTipJar';
import { useQuickPoll } from './hooks/useQuickPoll';
import { useInteractions } from './hooks/useInteractions';
import { useSound } from './hooks/useSound';
import { useLocalStorage } from './hooks/useLocalStorage';

/**
 * Main application component for the Stacks Transaction Hub.
 * Manages global state, contract interaction via custom hooks, and UI layout.
 * @returns {JSX.Element} The rendered application.
 */
export default function App() {
  // Global State
  const { address, connectWallet, disconnectWallet } = useWallet();
  const { lang, setLang, t } = useI18n();
  const { playSound } = useSound();

  // App State
  const [txLog, setTxLog] = useState([]);
  const [stats, setStats] = useState({ clicks: 0, tips: 0, votes: 0 });
  const [particleTrigger, setParticleTrigger] = useState(0);

  // Theme Management
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  /**
   * Adds a transaction record to the local transaction log and triggers UI notifications.
   * Note: The log is currently session-based and does not persist across page reloads.
   * @param {string} action - Description of the action (e.g., '🎯 Click').
   * @param {string} txId - Transaction ID from the blockchain.
   * @param {string} [status='success'] - Current status of the transaction.
   * @returns {Object} The created transaction object.
   */
  const addTxToLog = (action, txId, status = 'success') => {
    const tx = {
      id: txId || `pending-${Date.now()}`,
      action,
      status,
      time: new Date().toLocaleTimeString(),
    };
    setTxLog((prev) => [tx, ...prev.slice(0, 49)]);
    setParticleTrigger(prev => prev + 1);
    playSound('success');
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

  // Interaction Hooks
  const { clicker, tipjar, quickpoll, pingAll } = useInteractions({
    onTxSubmit: (action, txId) => {
      addTxToLog(action, txId);
      if (action === '🎯 Click') {
        setStats(prev => ({ ...prev, clicks: prev.clicks + 1 }));
      } else if (action === '💰 Tip') {
        setStats(prev => ({ ...prev, tips: prev.tips + 1 }));
      } else if (action === '🗳️ Vote') {
        setStats(prev => ({ ...prev, votes: prev.votes + 1 }));
      }
    }
  });

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in an input
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

      if (e.key.toLowerCase() === 'c') {
        playSound('click');
        clicker.click();
      }
      if (e.key.toLowerCase() === 't') {
        playSound('click');
        tipjar.quickTip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clicker, tipjar]);

  // Milestone Celebration
  const [celebration, setCelebration] = useState(null);
  useEffect(() => {
    const milestones = [10, 50, 100, 500];
    const total = stats.clicks + stats.tips + stats.votes;
    if (milestones.includes(total)) {
      setCelebration(`Level Up: ${total} Interactions!`);
      setParticleTrigger(prev => prev + 5); // Massive burst
      setTimeout(() => setCelebration(null), 3000);
    }
  }, [stats]);

  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = `/favicon.svg?state=${Date.now()}`;
    }
  }, [stats]);

  return (
    <div className="app-container" data-theme={theme}>
      <PullToRefresh onRefresh={async () => {
          // Mock refresh logic
          return new Promise(resolve => setTimeout(resolve, 2000));
      }} />
      <PerformanceOverlay />
      <ScrollToTop />
      <OnboardingTour />
      <a href="#main-content" className="skip-link">Skip to Content</a>
      <Toaster position="top-right" />
      <ParticleOverlay trigger={particleTrigger} />

      <MilestoneCelebration celebration={celebration} />

      <Header theme={theme} toggleTheme={toggleTheme} />

      <MainGrid
        address={address}
        stats={stats}
        txLog={txLog}
        clicker={clicker}
        tipjar={tipjar}
        quickpoll={quickpoll}
        pingAll={pingAll}
        setTxLog={setTxLog}
      />

      <Footer />

      <QuickActions
        address={address}
        onClearLog={() => setTxLog([])}
        onPingAll={pingAll}
      />
    </div>
  );
}
```
