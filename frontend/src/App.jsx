import React, { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import QuickActions from './components/QuickActions';
import NetworkHeartbeat from './components/NetworkHeartbeat';
import OnboardingTour from './components/OnboardingTour';
import FloatingActionButton from './components/FloatingActionButton';
import { useWallet } from './context/WalletContext';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleOverlay from './components/common/ParticleOverlay';
import PerformanceOverlay from './components/common/PerformanceOverlay';
import ScrollToTop from './components/common/ScrollToTop';
import SkeletonLoader from './components/common/SkeletonLoader';
import { useI18n } from './context/I18nContext';

// Lazy load heavy components for optimized initial paint
const MainGrid = React.lazy(() => import('./components/MainGrid'));
const PlayerStats = React.lazy(() => import('./components/PlayerStats'));
const TransactionHistory = React.lazy(() => import('./components/TransactionHistory'));

// Interaction Hooks
import { useInteractions } from './hooks/useInteractions';
import { useSound } from './hooks/useSound';
import { useLocalStorage } from './hooks/useLocalStorage';

/**
 * Main application component for the Stacks Clicker v2.
 * Orchestrates global state, blockchain interactions, theme management, and responsive layout.
 * Acts as the centralized hub for transaction logging and aesthetic feedback.
 *
 * @component
 * @returns {JSX.Element} The root application UI tree
 */
export default function App() {
  // Global Contexts
  const { address } = useWallet();
  const { lang, setLang } = useI18n();
  const { playSound } = useSound();

  // Application State
  const [txLog, setTxLog] = useState([]);
  const [stats, setStats] = useState({ clicks: 0, tips: 0, votes: 0 });
  const [particleTrigger, setParticleTrigger] = useState(0);
  const [celebration, setCelebration] = useState(null);

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
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, [setTheme]);

  /**
   * Adds a transaction record to the local session log and triggers UI notifications.
   *
   * @param {string} action - Human-readable label for the interaction (e.g., '🎯 Click')
   * @param {string} txId - The unique transaction hash returned from the Stacks network
   * @param {string} [status='success'] - Current lifecycle state of the transaction
   * @returns {Object} The formatted transaction object
   */
  const addTxToLog = useCallback((action, txId, status = 'success') => {
    const tx = {
      id: txId || `pending-${Date.now()}`,
      action,
      status,
      time: new Date().toLocaleTimeString(),
    };
    setTxLog((prev) => [tx, ...prev.slice(0, 49)]); // Maintain last 50 TXs
    setParticleTrigger(prev => prev + 1);
    playSound('success');

    toast.success(`${action} submitted!`, {
      icon: action.split(' ')[0],
      style: {
        borderRadius: '12px',
        background: '#1e1b4b',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.1)'
      }
    });
    return tx;
  }, [playSound]);

  /**
   * Unified interaction interface provided by the useInteractions collector.
   * Centralizes callbacks for all game-related contract calls.
   */
  const { clicker, tipjar, quickpoll, pingAll } = useInteractions({
    onTxSubmit: (action, txId) => {
      addTxToLog(action, txId);
      // Update local reactive stats for immediate feedback (optimistic logic)
      if (action.includes('Click')) {
        setStats(prev => ({ ...prev, clicks: prev.clicks + 1 }));
      } else if (action.includes('Tip')) {
        setStats(prev => ({ ...prev, tips: prev.tips + 1 }));
      } else if (action.includes('Vote')) {
        setStats(prev => ({ ...prev, votes: prev.votes + 1 }));
      }
    }
  });

  /**
   * Effect to handle global keyboard accessibility shortcuts.
   * 'C' for Click, 'T' for Quick Tip.
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent shortcut interference while typing
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

      if (e.key.toLowerCase() === 'c') {
        playSound('click');
        clicker.click();
      }
      if (e.key.toLowerCase() === 't') {
        playSound('click');
        tipjar.tip(0.001); // Standard quick tip amount
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clicker, tipjar, playSound]);

  /**
   * Effect to monitor interaction milestones and trigger celebrations.
   * Scales visual feedback (particles) during significant achievements.
   */
  useEffect(() => {
    const milestones = [10, 50, 100, 500];
    const total = stats.clicks + stats.tips + stats.votes;
    if (milestones.includes(total) && total > 0) {
      setCelebration(`Level Up: ${total} Interactions!`);
      setParticleTrigger(prev => prev + 5); // Execute a massive burst
      setTimeout(() => setCelebration(null), 3000);
    }
  }, [stats]);

  /**
   * Effect to dynamically update the favicon state based on interaction activity.
   */
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = `/favicon.svg?state=${Date.now()}`;
    }
  }, [stats]);

  const MilestoneCelebration = React.lazy(() => import('./components/MilestoneCelebration'));

  return (
    <div className="app-container" data-theme={theme}>
      <PerformanceOverlay />
      <ScrollToTop />

      <React.Suspense fallback={<SkeletonLoader height="80px" borderRadius="12px" />}>
        <Header theme={theme} toggleTheme={toggleTheme} currentLang={lang} onLangChange={setLang} />
      </React.Suspense>

      <div className="layout-content">
        <React.Suspense fallback={<SkeletonLoader height="300px" borderRadius="24px" />}>
          <PlayerStats stats={stats} txCount={txLog.length} />
        </React.Suspense>

        <main id="main-content" className="app-main">
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
      <QuickActions
        address={address}
        onClearLog={() => setTxLog([])}
        onPingAll={pingAll}
      />

      <a
        href="#main-content"
        className="skip-link"
        aria-label="Skip to main content"
      >
        Skip to Content
      </a>

      <Toaster position="top-right" />
      <ParticleOverlay trigger={particleTrigger} />
      <React.Suspense fallback={null}>
        <MilestoneCelebration celebration={celebration} />
      </React.Suspense>
    </div>
  );
}
