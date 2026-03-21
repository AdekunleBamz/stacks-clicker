import React, { useState, useCallback } from 'react';
import { WalletProvider, useWallet } from './context/WalletContext';
import ConnectButton from './components/ConnectButton';
import WalletConnectQRModal from './components/WalletConnectQRModal';
import ClickerGame from './components/ClickerGame';
import TipJar from './components/TipJar';
import QuickPoll from './components/QuickPoll';
import TransactionLog from './components/TransactionLog';
import Toast from './components/Toast';

/**
 * Main App Content (inside WalletProvider)
 */
export default function App() {
  // Global Contexts
  const { address } = useWallet();
  const { lang, setLang } = useI18n();
  const { playSound } = useSound();
  const stacksNetwork = (import.meta.env.VITE_STACKS_NETWORK || 'mainnet').toLowerCase();
  const explorerChain = stacksNetwork === 'testnet' ? 'testnet' : 'mainnet';

  // Application State
  const [txLog, setTxLog] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Show toast notification
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

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
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  /**
   * Adds a transaction record to the local session log and triggers UI notifications.
   *
   * @param {string} action - Human-readable label for the interaction (e.g., '🎯 Click')
   * @param {string} txId - The unique transaction hash returned from the Stacks network
   * @param {string} [status='success'] - Current lifecycle state of the transaction
   * @returns {Object} The formatted transaction object
   */
  const addTxToLog = useCallback(
    (action, txId, status = 'success') => {
      const submittedAt = new Date();
      const isPending = !txId || status === 'pending';
      const tx = {
        id: txId || `pending-${Date.now()}`,
        action,
        status,
        time: submittedAt.toLocaleTimeString(),
        submittedAt: submittedAt.toISOString(),
        network: explorerChain,
        explorerUrl: isPending ? null : `https://explorer.hiro.so/txid/${txId}?chain=${explorerChain}`,
        isPending,
      };
      setTxLog((prev) => [tx, ...prev.slice(0, 49)]); // Maintain last 50 TXs
      setParticleTrigger((prev) => prev + 1);
      playSound('success');

      notify.custom(`${action} submitted!`, action.split(' ')[0]);
      return tx;
    },
    [explorerChain, playSound]
  );

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

  useEffect(() => {
    const handleGlobalEsc = (e) => {
      if (e.key === 'Escape') {
        setCelebration(null);
        document.getElementById('main-content')?.focus();
      }
    };
    window.addEventListener('keydown', handleGlobalEsc);
    return () => window.removeEventListener('keydown', handleGlobalEsc);
  }, []);

  /**
   * Effect to monitor interaction milestones and trigger celebrations.
   * Scales visual feedback (particles) during significant achievements.
   */
  useEffect(() => {
    const milestones = [10, 50, 100, 500];
    const total = stats.clicks + stats.tips + stats.votes;
    if (milestones.includes(total) && total > 0) {
      setCelebration(`Level Up: ${total} Interactions!`);
      setParticleTrigger((prev) => prev + 5); // Execute a massive burst
      window.clearTimeout(celebrationTimeoutRef.current);
      celebrationTimeoutRef.current = window.setTimeout(() => setCelebration(null), 3000);
    }

    return () => window.clearTimeout(celebrationTimeoutRef.current);
  }, [stats]);

  /**
   * Effect to dynamically update the document title based on interaction activity.
   */
  useEffect(() => {
    const total = stats.clicks + stats.tips + stats.votes;
    document.title = total > 0 ? `(${total}) Stacks Clicker` : 'Stacks Clicker';
  }, [stats]);

  const MilestoneCelebration = React.lazy(() => import('./components/MilestoneCelebration'));

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🎮</span>
            <h1>StacksClicker</h1>
          </div>
          <ConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        {!isConnected ? (
          <div className="welcome-screen">
            <h2>Welcome to StacksClicker!</h2>
            <p>Connect your wallet to start playing</p>
            <div className="features">
              <div className="feature">
                <span>🎮</span>
                <h3>Clicker Game</h3>
                <p>Build click streaks and compete for the highest score</p>
              </div>
              <div className="feature">
                <span>💰</span>
                <h3>TipJar</h3>
                <p>Send micro-tips to support your favorite creators</p>
              </div>
              <div className="feature">
                <span>🗳️</span>
                <h3>QuickPoll</h3>
                <p>Create and vote on community polls</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="games-grid">
            <ClickerGame onTxSubmit={handleTxSubmit} />
            <TipJar onTxSubmit={handleTxSubmit} />
            <QuickPoll onTxSubmit={handleTxSubmit} />
          </div>
        )}

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
