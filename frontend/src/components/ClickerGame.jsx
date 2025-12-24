import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { callContract } from '../utils/walletconnect';

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

  const handleClick = async () => {
    if (!isConnected) return;
    
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

  const handleMultiClick = async () => {
    if (!isConnected) return;
    
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

  const handlePing = async () => {
    if (!isConnected) return;
    
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
      <div className="game-header">
        <h2>🎮 Clicker Game</h2>
        <span className="game-badge">Earn Streaks</span>
      </div>
      
      <div className="game-stats">
        <div className="stat">
          <span className="stat-value">{clickCount}</span>
          <span className="stat-label">Session Clicks</span>
        </div>
      </div>

      <div className="game-actions">
        <button 
          className="action-btn primary"
          onClick={handleClick}
          disabled={!isConnected || loading}
        >
          {loading ? '⏳' : '👆'} Click!
        </button>

        <div className="multi-click-group">
          <input
            type="number"
            min="1"
            max="100"
            value={multiClickAmount}
            onChange={(e) => setMultiClickAmount(parseInt(e.target.value) || 1)}
            className="multi-input"
          />
          <button 
            className="action-btn secondary"
            onClick={handleMultiClick}
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

      <p className="game-fee">Fee: 0.001 STX per action</p>
    </div>
  );
}
