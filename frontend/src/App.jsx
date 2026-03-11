import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import PlayerStats from './components/PlayerStats';
import TransactionHistory from './components/TransactionHistory';
import ClickerCard from './components/ClickerCard';
import TipJarCard from './components/TipJarCard';
import QuickPollCard from './components/QuickPollCard';
import QuickActions from './components/QuickActions';
import NetworkHeartbeat from './components/NetworkHeartbeat';
import OnboardingTour from './components/OnboardingTour';
import FloatingActionButton from './components/FloatingActionButton';
import InteractionStreaks from './components/InteractionStreaks';
import { useWallet } from './context/WalletContext';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleOverlay from './components/common/ParticleOverlay';
import PerformanceOverlay from './components/common/PerformanceOverlay';
import PullToRefresh from './components/common/PullToRefresh';
import { useI18n } from './context/I18nContext';

// Hooks
import { useClicker } from './hooks/useClicker';
import { useTipJar } from './hooks/useTipJar';
import { useQuickPoll } from './hooks/useQuickPoll';
import { useSound } from './hooks/useSound';

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
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
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

  // Initialize interaction hooks with success callbacks
  // These hooks manage contract communication and state updates
  const clicker = useClicker({
    onTxSubmit: (action, txId) => {
      // Record transaction in local history log
      addTxToLog('🎯 Click', txId);
      // Increment local session stats for immediate UI feedback
      setStats(prev => ({ ...prev, clicks: prev.clicks + 1 }));
    }
  });

  const tipjar = useTipJar({
    onTxSubmit: (action, txId) => {
      // Record tip in local history log
      addTxToLog('💰 Tip', txId);
      // Increment local session stats
      setStats(prev => ({ ...prev, tips: prev.tips + 1 }));
    }
  });

  const quickpoll = useQuickPoll({
    onTxSubmit: (action, txId) => {
      // Record vote in local history log
      addTxToLog('🗳️ Vote', txId);
      // Increment local session stats
      setStats(prev => ({ ...prev, votes: prev.votes + 1 }));
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
      <OnboardingTour />
      <a href="#main-content" className="skip-link">Skip to Content</a>
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

      <Header theme={theme} toggleTheme={toggleTheme} />

       <main className="app-main" id="main-content" tabIndex="-1">
...
       </main>

      <Footer />

      <FloatingActionButton
        onAction={(type) => {
          if (type === 'ping') {
            clicker.ping();
            tipjar.handleSelfPing();
            quickpoll.handlePollPing();
          } else if (type === 'clear') {
            setTxLog([]);
          }
        }}
      />
    </div>
  );
}
