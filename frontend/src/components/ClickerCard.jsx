import React from 'react';

export default function ClickerCard({
  address,
  isLoading,
  handleClick,
  handleMultiClick,
  handlePing,
}) {
  return (
    <div className="contract-card">
      <div className="contract-header">
        <div className="contract-icon clicker">🎯</div>
        <div>
          <div className="contract-title">Clicker</div>
          <div className="contract-subtitle">Click to generate transactions</div>
        </div>
      </div>
      <div className="actions">
        <button
          className="action-btn primary"
          onClick={handleClick}
          disabled={!address || isLoading('clicker-click')}
        >
          {isLoading('clicker-click') ? <span className="spinner"></span> : '🎯'}
          Click
          <span className="cost">0.001 STX</span>
        </button>
        <button
          className="action-btn secondary"
          onClick={handleMultiClick}
          disabled={!address || isLoading('clicker-multi-click')}
        >
          {isLoading('clicker-multi-click') ? <span className="spinner"></span> : '🔥'}
          10x Click
          <span className="cost">0.001 STX</span>
        </button>
        <button
          className="action-btn success"
          onClick={handlePing}
          disabled={!address || isLoading('clicker-ping')}
        >
          {isLoading('clicker-ping') ? <span className="spinner"></span> : '📡'}
          Ping
          <span className="cost">0.001 STX</span>
        </button>
      </div>
    </div>
  );
}
