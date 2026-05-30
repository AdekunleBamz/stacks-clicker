import { lazy, Suspense, useCallback, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import { useWallet } from './context/WalletContext';
import { useInteractions } from './hooks/useInteractions';
import { useMilestones } from './hooks/useMilestones';
import { useSound } from './hooks/useSound';
import { useTheme } from './hooks/useTheme';

const PlayerStats = lazy(() => import('./components/PlayerStats'));
const TransactionHistory = lazy(() => import('./components/TransactionHistory'));
const Footer = lazy(() => import('./components/Footer'));
const FloatingActionButton = lazy(() => import('./components/FloatingActionButton'));
const MilestoneCelebration = lazy(() => import('./components/MilestoneCelebration'));
const NetworkHeartbeat = lazy(() => import('./components/NetworkHeartbeat'));
const QuickActions = lazy(() => import('./components/QuickActions'));
const ParticleOverlay = lazy(() => import('./components/common/ParticleOverlay'));
const PerformanceOverlay = lazy(() => import('./components/common/PerformanceOverlay'));
const ScrollToTop = lazy(() => import('./components/common/ScrollToTop'));

const INITIAL_STATS = { clicks: 0, tips: 0, votes: 0 };
const deferredFallback = null;

function getNextStats(stats, action) {
  const label = action.toLowerCase();
  if (label.includes('click')) {
    const clickCount = label.includes('multi') || label.includes('10x') ? 10 : 1;
    return { ...stats, clicks: stats.clicks + clickCount };
  }
  if (label.includes('tip')) {
    return { ...stats, tips: stats.tips + 1 };
  }
  if (label.includes('vote') || label.includes('poll')) {
    return { ...stats, votes: stats.votes + 1 };
  }
  return stats;
}

export default function App() {
  const { address } = useWallet();
  const { theme, toggleTheme } = useTheme();
  const { playSound } = useSound();
  const [txLog, setTxLog] = useState([]);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [particleTrigger, setParticleTrigger] = useState(0);
  const totalInteractions = stats.clicks + stats.tips + stats.votes;
  const walletLabel = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Wallet pending';
  const activityLevel =
    totalInteractions > 24 ? 'High' : totalInteractions > 8 ? 'Rising' : 'Ready';

  const addTxToLog = useCallback(
    (action, txId) => {
      const submittedAt = new Date();
      const nextTx = {
        id: txId || `pending-${submittedAt.getTime()}`,
        action,
        status: txId ? 'success' : 'pending',
        time: submittedAt.toLocaleTimeString(),
        submittedAt: submittedAt.toISOString(),
        isPending: !txId,
      };

      setTxLog((current) => [nextTx, ...current].slice(0, 50));
      setStats((current) => getNextStats(current, action));
      setParticleTrigger((current) => current + 1);
      playSound('success');
      return nextTx;
    },
    [playSound]
  );

  const { clicker, tipjar, quickpoll, pingAll } = useInteractions({ onTxSubmit: addTxToLog });

  const clearLog = useCallback(() => {
    setTxLog([]);
  }, []);

  const handleFabAction = useCallback(
    (action) => {
      if (action === 'ping') {
        pingAll();
        return;
      }
      if (action === 'clear') {
        clearLog();
      }
    },
    [clearLog, pingAll]
  );

  const { celebration } = useMilestones({
    stats,
    onMilestone: () => setParticleTrigger((current) => current + 5),
  });

  return (
    <div
      className="app-container"
      data-theme={theme}
      role="application"
      aria-roledescription="web application"
    >
      <a
        href="#main-content"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main-content')?.focus();
        }}
      >
        Skip to main content
      </a>

      <Suspense fallback={deferredFallback}>
        <PerformanceOverlay />
      </Suspense>
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main id="main-content" className="app-main" role="main" tabIndex={-1}>
        <section className="command-hero" aria-labelledby="dashboard-title">
          <div className="hero-copy">
            <span className="hero-kicker">Stacks interaction console</span>
            <h2 id="dashboard-title">Stack clicks, tips, and votes into one live session.</h2>
            <p>
              Current output: {totalInteractions.toLocaleString()}{' '}
              {totalInteractions === 1 ? 'interaction' : 'interactions'} across this wallet session.
            </p>
            <div className="hero-status-row" aria-label="Session summary">
              <span className="status-chip online">Live network</span>
              <span className="status-chip">{walletLabel}</span>
              <span className="status-chip">{activityLevel} pulse</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Stacks Clicker session overview">
            <div className="hero-logo-frame">
              <img src="/logo512.png" alt="Stacks Clicker neon crystal logo" />
            </div>
            <div className="hero-panel">
              <div className="hero-panel-header">
                <span>Session Output</span>
                <strong>{totalInteractions.toLocaleString()}</strong>
              </div>
              <div className="hero-meter" aria-hidden="true">
                <span style={{ width: `${Math.min(totalInteractions * 8, 100)}%` }} />
              </div>
              <div className="hero-mini-grid">
                <span>
                  <strong>{stats.clicks.toLocaleString()}</strong>
                  Clicks
                </span>
                <span>
                  <strong>{stats.tips.toLocaleString()}</strong>
                  Tips
                </span>
                <span>
                  <strong>{stats.votes.toLocaleString()}</strong>
                  Votes
                </span>
              </div>
            </div>
            <Suspense fallback={deferredFallback}>
              <NetworkHeartbeat />
            </Suspense>
          </div>
        </section>

        <Suspense fallback={deferredFallback}>
          <PlayerStats stats={stats} txCount={txLog.length} />
        </Suspense>

        <div className="main-grid">
          <MainGrid
            address={address}
            stats={stats}
            clicker={clicker}
            tipjar={tipjar}
            quickpoll={quickpoll}
          />

          <aside className="stats-aside" aria-label="Recent activity and quick tools">
            <Suspense fallback={deferredFallback}>
              <TransactionHistory txLog={txLog} />
              <QuickActions address={address} onClearLog={clearLog} onPingAll={pingAll} />
            </Suspense>
          </aside>
        </div>
      </main>

      <Suspense fallback={deferredFallback}>
        <Footer />
        <FloatingActionButton onAction={handleFabAction} />
        <ScrollToTop />
        <ParticleOverlay trigger={particleTrigger} />
        <MilestoneCelebration celebration={celebration} />
      </Suspense>
      <Toaster position="top-right" />
    </div>
  );
}
