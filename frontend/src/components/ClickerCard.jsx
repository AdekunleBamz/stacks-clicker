import React from 'react';
import { motion } from 'framer-motion';

export default function ClickerCard({
  address,
  isLoading,
  handleClick,
  handleMultiClick,
  handlePing,
}) {
  return (
    <motion.div
      className="contract-card"
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(85, 70, 255, 0.2)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="contract-header">
        <div className="contract-icon clicker">🎯</div>
        <div>
          <div className="contract-title">Clicker</div>
          <div className="contract-subtitle">Click to generate transactions</div>
        </div>
      </div>
      <div className="actions">
        <motion.button
          className="action-btn primary"
          onClick={handleClick}
          disabled={!address || isLoading('clicker-click')}
          whileHover={address && !isLoading('clicker-click') ? { scale: 1.02 } : {}}
          whileTap={address && !isLoading('clicker-click') ? { scale: 0.95 } : {}}
        >
          {isLoading('clicker-click') ? <span className="spinner"></span> : '🎯'}
          Click
          <span className="cost">0.001 STX</span>
        </motion.button>
        <motion.button
          className="action-btn secondary"
          onClick={handleMultiClick}
          disabled={!address || isLoading('clicker-multi-click')}
          whileHover={address && !isLoading('clicker-multi-click') ? { scale: 1.02 } : {}}
          whileTap={address && !isLoading('clicker-multi-click') ? { scale: 0.95 } : {}}
        >
          {isLoading('clicker-multi-click') ? <span className="spinner"></span> : '🔥'}
          10x Click
          <span className="cost">0.001 STX</span>
        </motion.button>
        <motion.button
          className="action-btn success"
          onClick={handlePing}
          disabled={!address || isLoading('clicker-ping')}
          whileHover={address && !isLoading('clicker-ping') ? { scale: 1.02 } : {}}
          whileTap={address && !isLoading('clicker-ping') ? { scale: 0.95 } : {}}
        >
          {isLoading('clicker-ping') ? <span className="spinner"></span> : '📡'}
          Ping
          <span className="cost">0.001 STX</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
