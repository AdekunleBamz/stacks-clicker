import React, { useState, useCallback } from 'react';
import { useWallet } from '../context/WalletContext';
import { callContract } from '../utils/walletconnect';
import ParticleSystem from './ClickParticle';
import CountUp from './CountUp';

// Contract deployer address
const DEPLOYER = 'SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N';

/**
 * Clicker Game Component
 * Click to earn streaks and compete!
 */
export default function ClickerGame({ onTxSubmit }) {
  const { isConnected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [multiClickAmount, setMultiClickAmount] = useState(5);
  const [clickEvents, setClickEvents] = useState([]);

  const addClickEvent = (e) => {
    const newEvent = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    };
    setClickEvents(prev => [...prev, newEvent]);
  };

  const removeClickEvent = useCallback((id) => {
    setClickEvents(prev => prev.filter(event => event.id !== id));
  }, []);

  const handleClick = async (e) => {
    if (!isConnected) return;
    addClickEvent(e);

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

  const handleMultiClick = async (e) => {
    if (!isConnected) return;
    addClickEvent(e);
    soundEngine.play('click');

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

  const handlePing = async (e) => {
    if (!isConnected) return;
    addClickEvent(e);

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
    <div className="game-card clicker-game">
      <ParticleSystem clickEvents={clickEvents} removeEvent={removeClickEvent} />

      <div className="game-header">
        <h2 aria-label="Clicker Game Primary Interface">🎮 Clicker Game</h2>
        <span className="game-badge" title="Gamified operational click interface">Earn Streaks</span>
      </div>

      <div className="game-stats">
        <div className="stat">
          <span className="stat-value">
            <CountUp value={clickCount} />
          </span>
          <span className="stat-label">Session Clicks</span>
        </div>
      </div>

      <div className="game-actions" role="group" aria-label="Clicker Execution Controls">
        <button
          type="button"
          className="action-btn primary huge"
          onClick={handleManualClick}
          onClick={handleClick}
          disabled={!isConnected || loading}
          title="Click to generate a transaction manually"
        >
          <span aria-hidden="true">{loading ? '⏳' : '👆'}</span> Click!
        </button>

        <div className="multi-click-group" role="group" aria-label="Multi-Click Interventions">
          <input
            id="rapid-clicker-amount"
            type="number"
            min="1"
            max="100"
            value={multiClickAmount}
            onChange={(e) => setMultiClickAmount(Number.parseInt(e.target.value, 10) || 1)}
            className="multi-input"
            aria-label="Multi-click amount"
          />
          <button
            className="action-btn secondary"
            onClick={() => setShowMulti(prev => !prev)}
            title="Toggle bulk click interface dialog"
            disabled={!isConnected || loading}
          >
            Multi-Click ×{multiClickAmount}
          </button>
        </div>

        <button
          className="action-btn outline"
          onClick={handlePing}
          disabled={!isConnected || loading}
        >
          📡 Ping
        </button>
      </div>

      <p className="game-fee">Fee: 0.0001 STX per action</p>
    </div>
  );
}
