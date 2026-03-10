import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkeletonLoader from './common/SkeletonLoader';

/**
 * Component to display a list of recent transactions with status indicators.
 * @param {Object} props - Component props.
 * @param {Array} props.txLog - Array of transaction objects.
 * @returns {JSX.Element} The rendered transaction history section.
 */
export default function TransactionHistory({ txLog }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLog = txLog.filter(tx =>
    tx.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="search-highlight">{part}</mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };
  return (
    <section className="tx-log" aria-labelledby="tx-history-title">
      <div className="log-header">
        <h3 id="tx-history-title">📜 Recent Activity</h3>
        <div className="tx-search-container">
          <input
            type="text"
            placeholder="Search action or ID..."
            className="tx-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="tx-count-badge">{filteredLog.length}</span>
        </div>
      </div>

      <div className="tx-list">
        <AnimatePresence mode="popLayout">
          {filteredLog.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key="empty"
              className="empty-state"
            >
              <div className="empty-icon">📂</div>
              <p>{searchTerm ? 'No matches found.' : 'No transactions yet.'}</p>
              {!searchTerm && (
                <div className="skeleton-placeholder">
                  <SkeletonLoader height="60px" borderRadius="12px" className="mb-2" />
                  <SkeletonLoader height="60px" borderRadius="12px" opacity={0.5} />
                </div>
              )}
            </motion.div>
          ) : (
            filteredLog.map((tx) => (
              <motion.div
                key={tx.id}
                className={`tx-item ${tx.status}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                layout
              >
                <div className="tx-status-dot" aria-hidden="true" />
                <div className="tx-main">
                  <div className="tx-header">
                    <span className="tx-action-label">
                      {highlightText(tx.action, searchTerm)}
                    </span>
                    <span className="tx-timestamp">{tx.time}</span>
                  </div>
                  <div className="tx-status-visualizer">
                    <div className="status-steps">
                      <div className="step active">
                        <span className="step-dot"></span>
                        <span className="step-label">Submitted</span>
                      </div>
                      <div className={`step ${tx.id.startsWith('pending') ? 'pending' : 'active'}`}>
                        <span className="step-dot"></span>
                        <span className="step-label">Mempool</span>
                      </div>
                      <div className={`step ${tx.id.startsWith('pending') ? '' : 'active'}`}>
                        <span className="step-dot"></span>
                        <span className="step-label">Confirmed</span>
                      </div>
                    </div>
                    {!tx.id.startsWith('pending') && (
                      <a
                        href={`https://explorer.hiro.so/txid/${tx.id}?chain=mainnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tx-explorer-link"
                      >
                        {highlightText(tx.id.slice(0, 8), searchTerm)}...{highlightText(tx.id.slice(-6), searchTerm)} ↗
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
