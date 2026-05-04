import { useCallback, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import PlayerStats from './components/PlayerStats';
import TransactionHistory from './components/TransactionHistory';
import MainGrid from './components/MainGrid';
import Footer from './components/Footer';
import FloatingActionButton from './components/FloatingActionButton';
import MilestoneCelebration from './components/MilestoneCelebration';
import NetworkHeartbeat from './components/NetworkHeartbeat';
import QuickActions from './components/QuickActions';
import WalletConnectQRModal from './components/WalletConnectQRModal';
import ParticleOverlay from './components/common/ParticleOverlay';
import PerformanceOverlay from './components/common/PerformanceOverlay';
import ScrollToTop from './components/common/ScrollToTop';
import { useWallet } from './context/WalletContext';
import { useInteractions } from './hooks/useInteractions';
import { useMilestones } from './hooks/useMilestones';
import { useSound } from './hooks/useSound';
import { useTheme } from './hooks/useTheme';

const INITIAL_STATS = { clicks: 0, tips: 0, votes: 0 };

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
  const { address, walletConnectUri, closeWalletConnectModal } = useWallet();
  const { theme, toggleTheme } = useTheme();
  const { playSound } = useSound();
  const [txLog, setTxLog] = useState([]);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [particleTrigger, setParticleTrigger] = useState(0);

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

      <PerformanceOverlay />
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main id="main-content" className="app-main" role="main" tabIndex={-1}>
        <NetworkHeartbeat />
        <PlayerStats stats={stats} txCount={txLog.length} />

        <div className="main-grid">
          <MainGrid
            address={address}
            stats={stats}
            clicker={clicker}
            tipjar={tipjar}
            quickpoll={quickpoll}
          />

          <aside className="stats-aside" aria-label="Recent activity and quick tools">
            <TransactionHistory txLog={txLog} />
            <QuickActions address={address} onClearLog={clearLog} onPingAll={pingAll} />
          </aside>
        </div>
      </main>

      <Footer />
      <FloatingActionButton onAction={handleFabAction} />
      <ScrollToTop />
      <ParticleOverlay trigger={particleTrigger} />
      <MilestoneCelebration celebration={celebration} />
      {walletConnectUri && (
        <WalletConnectQRModal uri={walletConnectUri} onClose={closeWalletConnectModal} />
      )}
      <Toaster position="top-right" />
    </div>
  );
}
