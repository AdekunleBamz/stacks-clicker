import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { callContract } from '../utils/walletconnect';

// Contract deployer address
const DEPLOYER = 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT';

/**
 * Clicker Game Component
 * Click to earn streaks and compete!
 */
export default function ClickerGame({ onTxSubmit }) {
  const { isConnected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [multiClickAmount, setMultiClickAmount] = useState(5);

  const handleClick = async () => {
    if (!isConnected) return;

    setLoading(true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'clicker-v2p',
        functionName: 'click',
        functionArgs: [],
      });

      setClickCount((prev) => prev + 1);
      onTxSubmit?.('click', result.txId);
    } catch (err) {
      console.error('Click failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMultiClick = async () => {
    if (!isConnected) return;

    setLoading(true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'clicker-v2p',
        functionName: 'multi-click',
        functionArgs: [{ type: 'uint128', value: multiClickAmount.toString() }],
      });

      setClickCount((prev) => prev + multiClickAmount);
      onTxSubmit?.('multi-click', result.txId);
    } catch (err) {
      console.error('Multi-click failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePing = async () => {
    if (!isConnected) return;

    setLoading(true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'clicker-v2p',
        functionName: 'ping',
        functionArgs: [],
      });

      onTxSubmit?.('ping', result.txId);
    } catch (err) {
      console.error('Ping failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="game-card clicker-game glass-card" role="region" aria-labelledby="clicker-game-title">
      <div className="game-header">
        <h2 id="clicker-game-title">🎮 Clicker Game</h2>
        <span className="game-badge" title="Gamified operational click interface">Earn Streaks</span>
      </div>

      <div className="game-stats" role="group" aria-label="Game progress summary">
        <div className="stat">
          <span className="stat-value" aria-live="polite" aria-atomic="true">{clickCount}</span>
          <span className="stat-label">Total Clicks</span>
        </div>
      </div>

      <div className="game-actions">
        <button
          type="button"
          className="action-btn primary-button huge"
          onClick={handleClick}
          disabled={!isConnected || loading}
          title="Click to generate a transaction manually"
          aria-label={loading ? "Processing click..." : "Click to earn streaks"}
        >
          <span aria-hidden="true">{loading ? '⏳' : '👆'}</span> Click!
        </button>

        <div className="multi-click-group">
          <input
            type="number"
            min="1"
            max="100"
            value={multiClickAmount}
            onChange={(e) => setMultiClickAmount(Number.parseInt(e.target.value, 10) || 1)}
            className="multi-input input-field"
            aria-label="Number of multi-clicks"
            title="Choose between 1 and 100 automatic clicks"
          />
          <button
            type="button"
            className="action-btn secondary-button"
            onClick={handleMultiClick}
            title={`Submit a transaction for ${multiClickAmount} clicks at once`}
            disabled={!isConnected || loading}
            aria-label={`Submit ${multiClickAmount} multi-clicks`}
          >
            Multi-Click ×{multiClickAmount}
          </button>
        </div>

        <button
          type="button"
          className="action-btn secondary-button outline"
          onClick={handlePing}
          disabled={!isConnected || loading}
          aria-label="Send a network ping transaction"
        >
          📡 Ping
        </button>
      </div>

      <p className="game-fee">Fee: 0.0001 STX per action</p>
    </div>
  );
}
