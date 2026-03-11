import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Individual transaction item with swipe actions and status visualization.
 */
export default function TransactionItem({
  tx,
  searchTerm,
  highlightText,
  onDetails,
  onCopy,
  onContextMenu
}) {
  return (
    <div className="tx-item-wrapper">
      <div className="tx-swipe-actions">
        <button
          className="swipe-btn copy"
          onClick={() => onCopy(tx.id)}
          aria-label="Copy ID"
        >
          📋
        </button>
        <button
          className="swipe-btn details"
          onClick={() => onDetails(tx)}
          aria-label="View Details"
        >
          🔍
        </button>
      </div>
      <motion.div
        className={`tx-item ${tx.status}`}
        drag="x"
        dragConstraints={{ left: -120, right: 0 }}
        dragElastic={0.1}
        whileDrag={{ scale: 1.02 }}
        onContextMenu={(e) => onContextMenu(e, tx)}
      >
        <div className="tx-status-dot" aria-hidden="true" />
        <div className="tx-main">
          <div className="tx-header">
            <span className="tx-action-label">
              {highlightText(tx.action, searchTerm)}
            </span>
            <span className="tx-timestamp">{tx.time}</span>
          </div>
          <div className="tx-actions-inline">
            <button className="text-btn" onClick={() => onDetails(tx)}>Details</button>
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
    </div>
  );
}

TransactionItem.propTypes = {
  tx: PropTypes.shape({
    id: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
  }).isRequired,
  searchTerm: PropTypes.string,
  highlightText: PropTypes.func.isRequired,
  onDetails: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired
};
