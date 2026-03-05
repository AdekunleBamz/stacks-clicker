import React from 'react';

/**
 * Transaction Log Component
 * Displays recent transactions with status
 */
export default function TransactionLog({ transactions = [] }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return '✅';
      case 'pending':
        return '⏳';
      case 'failed':
        return '❌';
      default:
        return '📝';
    }
  };

  const getExplorerLink = (txId) => {
    if (!txId || txId.startsWith('pending-')) return null;
    return `https://explorer.hiro.so/txid/${txId}?chain=mainnet`;
  };

  if (transactions.length === 0) {
    return (
      <div className="tx-log empty">
        <h3>📋 Transaction Log</h3>
        <p className="empty-message">No transactions yet. Start playing!</p>
      </div>
    );
  }

  return (
    <div className="tx-log">
      <h3>📋 Transaction Log</h3>
      <div className="tx-list">
        {transactions.map((tx, index) => (
          <div key={tx.id || index} className={`tx-item ${tx.status}`}>
            <span className="tx-status">{getStatusIcon(tx.status)}</span>
            <span className="tx-action">{tx.action}</span>
            <span className="tx-time">{tx.time}</span>
            {getExplorerLink(tx.id) && (
              <a
                href={getExplorerLink(tx.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="tx-link"
                title="View on Explorer"
              >
                🔗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
