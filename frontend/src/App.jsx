import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PlayerStats from './components/PlayerStats';
import TransactionHistory from './components/TransactionHistory';
import ClickerCard from './components/ClickerCard';
import TipJarCard from './components/TipJarCard';
import QuickPollCard from './components/QuickPollCard';
import QuickActions from './components/QuickActions';
import NetworkHeartbeat from './components/NetworkHeartbeat';
import OnboardingTour from './components/OnboardingTour';
import FloatingActionButton from './components/FloatingActionButton';
import { useWallet } from './context/WalletContext';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleOverlay from './components/common/ParticleOverlay';
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

  return (
    <div className="app-container">
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
            <NetworkHeartbeat />
            <select
              className="lang-select"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

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

      <main className="app-main" id="main-content" tabIndex="-1">
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
            <QuickActions
              address={address}
              onClearLog={() => setTxLog([])}
              onPingAll={() => {
                clicker.ping();
                tipjar.handleSelfPing();
                quickpoll.handlePollPing();
              }}
            />
            <TransactionHistory txLog={txLog} />
          </aside>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with ❤️ on Stacks</p>
      </footer>
    </div>
  );
}
