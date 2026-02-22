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
function AppContent() {
  const { wcUri, showQRModal, closeQRModal, isConnected } = useWallet();
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

  // Handle transaction submission
  const handleTxSubmit = useCallback((action, txId) => {
    const tx = {
      id: txId || `pending-${Date.now()}`,
      action,
      status: txId ? 'pending' : 'submitted',
      time: new Date().toLocaleTimeString()
    };
    setTxLog(prev => [tx, ...prev.slice(0, 49)]);
    showToast(`${action} submitted! 🚀`, 'success');
  }, [showToast]);

  return (
    <div className="app">
      {/* Header */}
      <header className="header" role="banner">
        <div className="header-content">
          <div className="logo" aria-label="StacksClicker Logo">
            <span className="logo-icon" aria-hidden="true">🎮</span>
            <h1>StacksClicker</h1>
          </div>
          <ConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="main" role="main">
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
