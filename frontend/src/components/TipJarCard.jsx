import React from 'react';

export default function TipJarCard({
  address,
  isLoading,
  tipAmount,
  setTipAmount,
  handleSelfPing,
  handleQuickTip,
  handleCustomTip
}) {
  return (
    <div className="contract-card">
      <div className="contract-header">
        <div className="contract-icon tipjar">💰</div>
        <div>
          <div className="contract-title">TipJar</div>
          <div className="contract-subtitle">Send tips to generate transactions</div>
        </div>
      </div>
      <div className="actions">
        <button
          className="action-btn success"
          onClick={handleSelfPing}
          disabled={!address || isLoading('tipjar-self-ping')}
        >
          {isLoading('tipjar-self-ping') ? <span className="spinner"></span> : '🏓'}
          Self Ping
          <span className="cost">0.001 STX</span>
        </button>
        <button
          className="action-btn warning"
          onClick={handleQuickTip}
          disabled={!address || isLoading('tipjar-quick-tip')}
        >
          {isLoading('tipjar-quick-tip') ? <span className="spinner"></span> : '💰'}
          Quick Tip
          <span className="cost">0.002 STX</span>
        </button>
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
        <button
          className="action-btn secondary"
          onClick={handleCustomTip}
          disabled={!address || isLoading('tipjar-tip-jar')}
        >
          {isLoading('tipjar-tip-jar') ? <span className="spinner"></span> : '💎'}
          Custom Tip
          <span className="cost">{(parseFloat(tipAmount || 0) + 0.001).toFixed(3)} STX</span>
        </button>
      </div>
    </div>
  );
}
