import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/**
 * Individual transaction item with swipe actions and status visualization.
 */
function TransactionItem({
  tx,
  searchTerm,
  highlightText,
  onDetails,
  onCopy,
  onContextMenu,
  onOpenExplorer,
}) {
  const txId = String(tx.id ?? '');
  const isPending = tx.isPending ?? txId.startsWith('pending');
  const [ref, inView] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div className="tx-item-wrapper" role="listitem" ref={ref}>
      <div className="tx-swipe-actions">
        <button type="button" className="swipe-btn copy" onClick={() => onCopy(tx.id)} aria-label="Copy transaction ID" title="Copy transaction ID">
          📋
        </button>
        <button
          type="button"
          className="swipe-btn details"
          onClick={() => onDetails(tx)}
          aria-label="View Details"
          title="View Details"
        >
          🔍
        </button>
      </div>
      <motion.div
        className={`tx-item ${tx.status}`}
        tabIndex={0}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        drag="x"
        dragConstraints={{ left: -140, right: 0 }}
        dragElastic={0.15}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        whileDrag={{ scale: 1.01, cursor: 'grabbing' }}
        whileFocus={{
          scale: 1.01,
          borderColor: 'var(--primary)',
          boxShadow: '0 0 0 2px var(--primary-glow)',
          outline: 'none'
        }}
        onContextMenu={(e) => onContextMenu(e, tx)}
      >
        <div className="tx-status-dot" aria-hidden="true" />
        <div className="tx-main">
          <div className="tx-header">
            <span className="tx-action-label">{highlightText(tx.action, searchTerm)}</span>
            <span className="tx-timestamp" title={tx.time} aria-label={`Transaction time: ${tx.time}`}>{tx.time}</span>
          </div>
          <div className="tx-actions-inline">
            <button type="button" className="text-btn" onClick={() => onDetails(tx)} title="View full transaction details" aria-label="View full transaction details">
              View Details <span aria-hidden="true">→</span>
            </button>
            <span className="tx-action-separator" aria-hidden="true">•</span>
            <button type="button" className="text-btn" onClick={() => onCopy(tx.id)} aria-label="Copy full transaction ID" title="Copy transaction ID to clipboard">
              Copy ID
            </button>
          </div>
          <div className="tx-status-visualizer">
            <div className="status-steps" aria-label="Transaction Confirmation Flow">
              <div className="step active">
                <span className="step-dot"></span>
                <span className="step-label">Submitted</span>
              </div>
              <div className={`step ${isPending ? 'pending' : (tx.status === 'failed' ? 'error' : 'active')}`}>
                <span className="step-dot"></span>
                <span className="step-label" title={tx.status === 'failed' ? 'Transaction execution failed' : 'Transaction is awaiting confirmation in the mempool'}>
                  {tx.status === 'failed' ? 'Failed' : 'Mempool'}
                </span>
              </div>
              <div className={`step ${isPending ? '' : 'active'}`}>
                <span className="step-dot"></span>
                <span className="step-label">Confirmed</span>
              </div>
            </div>
            {tx.explorerUrl && (
              <button type="button" onClick={() => onOpenExplorer(tx)} className="tx-explorer-link" title="View on Stacks Explorer"
                aria-label={`Open transaction ${txId.slice(0, 8)} in explorer`}>
                {highlightText(txId.slice(0, 8), searchTerm)}...
                {highlightText(txId.slice(-6), searchTerm)} ↗
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

TransactionItem.propTypes = {
  tx: PropTypes.shape({
    id: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  searchTerm: PropTypes.string,
  highlightText: PropTypes.func.isRequired,
  onDetails: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  onOpenExplorer: PropTypes.func.isRequired,
};

TransactionItem.defaultProps = {
  searchTerm: '',
};

export default memo(TransactionItem);
