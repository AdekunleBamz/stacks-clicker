import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkeletonLoader from './common/SkeletonLoader';

/**
 * Component to display a list of recent transactions with status indicators.
 * @param {Object} props - Component props.
 * @param {Array} props.txLog - Array of transaction objects.
 * @returns {JSX.Element} The rendered transaction history section.
 */
export default function TransactionHistory({ txLog }) {
  return (
    <section className="tx-log" aria-labelledby="tx-history-title">
      <div className="log-header">
        <h3 id="tx-history-title">📜 Recent Activity</h3>
        <span className="tx-count-badge">{txLog.length}</span>
      </div>

      <div className="tx-list">
        <AnimatePresence mode="popLayout">
          {txLog.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="empty-state"
            >
              <div className="empty-icon">📂</div>
              <p>No transactions yet.</p>
              <div className="skeleton-placeholder">
                <SkeletonLoader height="60px" borderRadius="12px" className="mb-2" />
                <SkeletonLoader height="60px" borderRadius="12px" opacity={0.5} />
              </div>
            </motion.div>
          ) : (
            txLog.map((tx) => (
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
                    <span className="tx-action-label">{tx.action}</span>
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
                        {tx.id.slice(0, 8)}...{tx.id.slice(-6)} ↗
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

TransactionHistory.propTypes = {
  txLog: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      action: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      network: PropTypes.string,
      submittedAt: PropTypes.string,
      explorerUrl: PropTypes.string,
      isPending: PropTypes.bool,
    })
  ).isRequired,
  isLoading: PropTypes.bool,
  showError: PropTypes.bool,
  onRetry: PropTypes.func,
};

export default memo(TransactionHistory);
