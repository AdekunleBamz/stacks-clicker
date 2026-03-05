import React from 'react';
import { motion } from 'framer-motion';

export default function TipJarCard({
  address,
  isLoading,
  tipAmount,
  setTipAmount,
  handleSelfPing,
  handleQuickTip,
  handleCustomTip,
}) {
  return (
    <motion.div
      className="contract-card"
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(85, 70, 255, 0.2)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="contract-header">
        <div className="contract-icon tipjar">💰</div>
        <div>
          <div className="contract-title">TipJar</div>
          <div className="contract-subtitle">Send tips to generate transactions</div>
        </div>
      </div>
      <div className="actions">
        <motion.button
          className="action-btn success"
          onClick={handleSelfPing}
          disabled={!address || isLoading('tipjar-self-ping')}
          whileHover={address && !isLoading('tipjar-self-ping') ? { scale: 1.02 } : {}}
          whileTap={address && !isLoading('tipjar-self-ping') ? { scale: 0.95 } : {}}
        >
          {isLoading('tipjar-self-ping') ? <span className="spinner"></span> : '🏓'}
          Self Ping
          <span className="cost">0.001 STX</span>
        </motion.button>
        <motion.button
          className="action-btn warning"
          onClick={handleQuickTip}
          disabled={!address || isLoading('tipjar-quick-tip')}
          whileHover={address && !isLoading('tipjar-quick-tip') ? { scale: 1.02 } : {}}
          whileTap={address && !isLoading('tipjar-quick-tip') ? { scale: 0.95 } : {}}
        >
          {isLoading('tipjar-quick-tip') ? <span className="spinner"></span> : '💰'}
          Quick Tip
          <span className="cost">0.002 STX</span>
        </motion.button>
        <div className="input-group">
          <input
            type="number"
            step="0.001"
            min="0.001"
            value={tipAmount}
            onChange={(e) => setTipAmount(e.target.value)}
            placeholder="Amount in STX"
          />
        </div>
        <motion.button
          className="action-btn secondary"
          onClick={handleCustomTip}
          disabled={!address || isLoading('tipjar-tip-jar')}
          whileHover={address && !isLoading('tipjar-tip-jar') ? { scale: 1.02 } : {}}
          whileTap={address && !isLoading('tipjar-tip-jar') ? { scale: 0.95 } : {}}
        >
          {isLoading('tipjar-tip-jar') ? <span className="spinner"></span> : '💎'}
          Custom Tip
          <span className="cost">{(parseFloat(tipAmount || 0) + 0.001).toFixed(3)} STX</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
