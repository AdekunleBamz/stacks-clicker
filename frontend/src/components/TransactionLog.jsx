import PropTypes from 'prop-types';

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

  const getExplorerLink = (txId, network = 'mainnet') => {
    if (!txId || txId.startsWith('pending-')) return null;
    return `https://explorer.hiro.so/txid/${txId}?chain=${network}`;
  };

  if (transactions.length === 0) {
    return (
      <div className="tx-log empty">
        <h3 aria-label="Detailed Transaction Log">📋 Transaction Log</h3>
        <p className="empty-message">No transactions yet. Start playing!</p>
      </div>
    );
  }

  return (
    <div className="tx-log">
      <h3><span aria-hidden="true">📋</span> Transaction Log</h3>
      <div className="tx-list" role="log" aria-live="polite" aria-relevant="additions text">
        {transactions.map((tx, index) => {
          const explorerLink = getExplorerLink(tx.id, tx.network);
          return (
          <div key={tx.id || index} className={`tx-item ${tx.status}`}>
            <span className="tx-status">{getStatusIcon(tx.status)}</span>
            <span className="tx-action">{tx.action}</span>
            <span className="tx-time">{tx.time}</span>
            {explorerLink && (
              <a
                href={explorerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="tx-link"
                title="View on Explorer"
                aria-label={`Open transaction ${tx.id} on Hiro Explorer`}
              >
                🔗
              </a>
            )}
          </div>
          );
        })}
      </div>
    </div>
  );
}

TransactionLog.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    action: PropTypes.string,
    time: PropTypes.string,
    network: PropTypes.string
  }))
};
