import React from 'react';

export default function TransactionHistory({ txLog }) {
  return (
    <section className="tx-log">
      <h3>📜 Transaction History</h3>
      <div className="tx-list">
        {txLog.length === 0 ? (
          <div className="empty-state">
            <p>No transactions yet. Start clicking! ⚡</p>
          </div>
        ) : (
          txLog.map((tx, idx) => (
            <div key={tx.id + idx} className="tx-item">
              <div className={`tx-status ${tx.status}`}></div>
              <div className="tx-info">
                <div className="tx-action">{tx.action}</div>
                <div className="tx-id">
                  {tx.id.startsWith('pending') ? (
                    'Awaiting...'
                  ) : (
                    <a
                      href={`https://explorer.hiro.so/txid/${tx.id}?chain=mainnet`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#00D4AA' }}
                    >
                      {tx.id.slice(0, 20)}...
                    </a>
                  )}
                </div>
              </div>
              <div className="tx-time">{tx.time}</div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
