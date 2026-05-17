import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '../context/WalletContext';
import { callContract } from '../utils/stacksWallet';
import ParticleSystem from './ClickParticle';
import CountUp from './CountUp';
import soundEngine from '../utils/SoundEngine';

// Contract deployer address for the Stacks Clicker game contracts
const DEPLOYER = 'SP3FKNEZ86RG5RT7SZ5FBRGH85FZNG94ZH1MCGG6N';

/**
 * Clicker Game Component
 * Click to earn streaks and compete!
 */
export default function ClickerGame({ onTxSubmit }) {
  const { isConnected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clickEvents, setClickEvents] = useState([]);
  const addClickEvent = (e) => {
    const newEvent = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setClickEvents((prev) => [...prev, newEvent]);
  };

  const removeClickEvent = useCallback((id) => {
    setClickEvents((prev) => prev.filter((event) => event.id !== id));
  }, []);

  const handleClick = async (e) => {
    if (!isConnected) return;
    addClickEvent(e);
    soundEngine.play('click');

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
      soundEngine.play('success');
    } catch (err) {
      console.error('Click failed:', err);
      soundEngine.play('error');
    } finally {
      setLoading(false);
    }
  };

  const handlePing = async (e) => {
    if (!isConnected) return;
    addClickEvent(e);
    soundEngine.play('click');
    if (window.navigator?.vibrate) window.navigator.vibrate(20);

    setLoading(true);
    try {
      const result = await callContract({
        contractAddress: DEPLOYER,
        contractName: 'clicker-v2p',
        functionName: 'ping',
        functionArgs: [],
      });

      onTxSubmit?.('ping', result.txId);
      soundEngine.play('success');
    } catch (err) {
      console.error('Ping failed:', err);
      soundEngine.play('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="game-card clicker-game">
      <ParticleSystem clickEvents={clickEvents} removeEvent={removeClickEvent} />

      <div className="game-header">
        <h2 aria-label="Clicker Game Primary Interface">🎮 Clicker Game</h2>
        <span className="game-badge" title="Gamified operational click interface">
          Earn Streaks
        </span>
      </div>

      <div className="game-stats">
        <div className="stat">
          <span className="stat-value" aria-live="polite" aria-atomic="true">
            <CountUp value={clickCount} />
          </span>
          <span className="stat-label">Session Clicks</span>
        </div>
      </div>

      <div className="game-actions">
        <button
          type="button"
          className="action-btn primary huge"
          onClick={handleClick}
          disabled={!isConnected || loading}
          title="Click to generate a transaction manually"
        >
          {loading ? '⏳' : '👆'} Click!
        </button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="action-btn outline"
          onClick={handlePing}
          disabled={!isConnected || loading}
          aria-label="Ping the contract"
          title="Send a network heartbeat to verify connectivity"
        >
          📡 Ping
        </motion.button>
      </div>

      <p className="game-fee">Fee: 0.0001 STX per action</p>
    </div>
  );
}
