import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

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

  return (
    <div className="tx-item-wrapper">
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
        className={`tx-card ${tx.tx_status}`}
        tabIndex={0}
        drag="x"
        dragConstraints={{ left: -120, right: 0 }}
        dragElastic={0.1}
        whileDrag={{ scale: 1.02 }}
        onContextMenu={(e) => onContextMenu(e, tx)}
      >
        <div className="tx-status-dot" aria-hidden="true" />
        <div className="tx-main">
          <div className="tx-header">
            <span className="tx-action-label">{highlightText(tx.action, searchTerm)}</span>
            <span className="tx-timestamp">{tx.time}</span>
          </div>
          <div className="tx-actions-inline">
            <button type="button" className="text-btn" onClick={() => onDetails(tx)} title="View full transaction details">
              View Details <span>→</span>
            </button>
            <span className="tx-action-separator">•</span>
            <button type="button" className="text-btn" onClick={() => onCopy(tx.id)}>
              Copy ID
            </button>
          </div>
          <div className="tx-status-visualizer">
            <div className="status-steps" aria-label="Transaction Confirmation Flow">
              <div className="step active">
                <span className="step-dot"></span>
                <span className="step-label">Submitted</span>
              </div>
              <div className={`step ${isPending ? 'pending' : 'active'}`}>
                <span className="step-dot"></span>
                <span className="step-label" title="Transaction is awaiting confirmation in the mempool">Mempool</span>
              </div>
              <div className={`step ${isPending ? '' : 'active'}`}>
                <span className="step-dot"></span>
                <span className="step-label">Confirmed</span>
              </div>
            </div>
            {tx.explorerUrl && (
              <button type="button" onClick={() => onOpenExplorer(tx)} className="tx-explorer-link">
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

export default memo(TransactionItem);
