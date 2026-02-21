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
  const { address, isConnected } = useWallet();
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
        contractName: 'clicker',
        functionName: 'click',
        functionArgs: []
      });

      setClickCount(prev => prev + 1);
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

    setLoading(true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'clicker',
        functionName: 'multi-click',
        functionArgs: [{ type: 'uint128', value: multiClickAmount.toString() }]
      });

      setClickCount(prev => prev + multiClickAmount);
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
        contractName: 'clicker',
        functionName: 'ping',
        functionArgs: []
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
        <h2>🎮 Clicker Game</h2>
        <span className="game-badge">Earn Streaks</span>
      </div>

      <div className="game-stats">
        <div className="stat">
          <span className="stat-value">
            <CountUp value={clickCount} />
          </span>
          <span className="stat-label">Session Clicks</span>
        </div>
      </div>

      <div className="game-actions">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="action-btn primary"
          onClick={handleClick}
          disabled={!isConnected || loading}
          aria-label="Click to earn streak"
        >
          {loading ? '⏳' : '👆'} Click!
        </motion.button>

        <div className="multi-click-group">
          <input
            type="number"
            min="1"
            max="100"
            value={multiClickAmount}
            onChange={(e) => setMultiClickAmount(parseInt(e.target.value) || 1)}
            className="multi-input"
            aria-label="Multi-click amount"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="action-btn secondary"
            onClick={handleMultiClick}
            disabled={!isConnected || loading}
            aria-label={`Multi-click ${multiClickAmount} times`}
          >
            Multi-Click ×{multiClickAmount}
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="action-btn outline"
          onClick={handlePing}
          disabled={!isConnected || loading}
          aria-label="Ping the contract"
        >
          📡 Ping
        </motion.button>
      </div>

      <p className="game-fee">Fee: 0.001 STX per action</p>
    </div>
  );
}
