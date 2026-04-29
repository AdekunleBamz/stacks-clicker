import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import SkeletonLoader from './common/SkeletonLoader';
import { STACKS_NETWORK } from '../utils/constants';

/**
 * Error fallback component for transaction history
 */
function TransactionHistory({ txLog }) {
  return (
    <section className="tx-log" aria-labelledby="tx-history-title">
      <div className="log-header">
        <h3 id="tx-history-title"><span aria-hidden="true">📜</span> Recent Activity</h3>
        <span className="tx-count-badge" aria-label={`${txLog.length} transactions in history`} title="Transactions currently shown">{txLog.length}</span>
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
              <p>No transactions yet. Trigger an action to populate activity.</p>
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
                    <div className="status-steps" aria-label="Transaction progress">
                      <div className="step active">
                        <span className="step-dot"></span>
                        <span className="step-label">Submitted</span>
                      </div>
                      <div className={`step ${tx.id?.startsWith('pending') ? 'pending' : 'active'}`}>
                        <span className="step-dot"></span>
                        <span className="step-label">Mempool</span>
                      </div>
                      <div className={`step ${tx.id?.startsWith('pending') ? '' : 'active'}`}>
                        <span className="step-dot"></span>
                        <span className="step-label">Confirmed</span>
                      </div>
                    </div>
                    {tx.id && !tx.id.startsWith('pending') && (
                      <a
                        href={`https://explorer.hiro.so/txid/${tx.id}?chain=${STACKS_NETWORK}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tx-explorer-link"
                        title="Open transaction in Hiro Explorer"
                        aria-label={`Open transaction ${tx.id.slice(0, 8)} in Hiro Explorer`}
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

TransactionHistory.defaultProps = {
  isLoading: false,
  showError: false,
  onRetry: undefined,
};

export default memo(TransactionHistory);
