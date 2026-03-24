import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { notify } from './utils/toast';
import Header from './components/Header';
import Footer from './components/Footer';
import QuickActions from './components/QuickActions';
import NetworkHeartbeat from './components/NetworkHeartbeat';
import OnboardingTour from './components/OnboardingTour';
import FloatingActionButton from './components/FloatingActionButton';
import { useWallet } from './context/WalletContext';
import ParticleOverlay from './components/common/ParticleOverlay';
import PerformanceOverlay from './components/common/PerformanceOverlay';
import ScrollToTop from './components/common/ScrollToTop';
import SkeletonLoader from './components/common/SkeletonLoader';
import { useI18n } from './context/I18nContext';
import { useInteractions } from './hooks/useInteractions';
import { useSound } from './hooks/useSound';
import { useTheme } from './hooks/useTheme';
import { useTransactionHistory } from './hooks/useTransactionHistory';
import { useMilestones } from './hooks/useMilestones';
import { useDocumentTitle } from './hooks/useDocumentTitle';
import { useKeydown } from './hooks/useKeydown';
import { useBattery } from './hooks/useBattery';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

// Lazy load heavy components for optimized initial paint
const MainGrid = React.lazy(() => import('./components/MainGrid'));
const PlayerStats = React.lazy(() => import('./components/PlayerStats'));
const TransactionHistory = React.lazy(() => import('./components/TransactionHistory'));

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
  const { txLog, addTxToLog, setTxLog } = useTransactionHistory({
    playSound,
    onTxAdded: () => setParticleTrigger((prev) => prev + 1),
  });
  const [stats, setStats] = useState({ clicks: 0, tips: 0, votes: 0 });
  const { celebration } = useMilestones({
    stats,
    onMilestone: (total) => {
      setParticleTrigger((prev) => prev + 5);
    },
  });
  const [particleTrigger, setParticleTrigger] = useState(0);

  // Theme Management
  const { theme, toggleTheme } = useTheme();


  /**
   * Unified interaction interface provided by the useInteractions collector.
   * Centralizes callbacks for all game-related contract calls.
   */
  const { clicker, tipjar, quickpoll, pingAll } = useInteractions({
    onTxSubmit: (action, txId) => {
      addTxToLog(action, txId);
      const normalizedAction = String(action).toLowerCase();
      // Update local reactive stats for immediate feedback (optimistic logic)
      if (normalizedAction.includes('click')) {
        setStats((prev) => ({ ...prev, clicks: prev.clicks + 1 }));
      } else if (normalizedAction.includes('tip')) {
        setStats((prev) => ({ ...prev, tips: prev.tips + 1 }));
      } else if (normalizedAction.includes('vote')) {
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


  /**
   * Global Tab Feedback
   */
  useDocumentTitle({
    title: 'Stacks Clicker',
    count: stats.clicks + stats.tips + stats.votes,
  });

  // Global shortcuts
  useKeydown('Escape', () => {
    // Reset any open UI states if Escape is pressed
    console.debug('[App] Escape key pressed: Resetting UI states');
  });

  const { isLowBattery } = useBattery();

  if (isLowBattery) {
    console.debug('[App] Low battery detected: Enabling power-saving mode');
  }

  const isOnline = useNetworkStatus();
  const prefersReducedMotion = usePrefersReducedMotion();

  const MilestoneCelebration = React.lazy(() => import('./components/MilestoneCelebration'));

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

      <div className="layout-content" role="presentation">
        <React.Suspense fallback={<SkeletonLoader height="300px" borderRadius="24px" />}>
          <PlayerStats stats={stats} txCount={txLog.length} />
        </React.Suspense>

        <main id="main-content" className="app-main" tabIndex={-1} style={{ outline: 'none' }}>
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
      {!prefersReducedMotion && <ParticleOverlay trigger={particleTrigger} />}
      <React.Suspense fallback={null}>
        <MilestoneCelebration celebration={celebration} />
      </React.Suspense>
    </div>
  );
}
