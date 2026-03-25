import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useLongPress } from '../hooks/useLongPress';
import { truncateAddress } from '../utils/format';

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

  const longPressHandlers = useLongPress(() => onDetails(tx), { delay: 600 });

  return (
    <div className="tx-item-wrapper" role="listitem">
      <div className="tx-swipe-actions" aria-label="Quick transaction actions">
        <button type="button" className="swipe-btn copy" onClick={() => onCopy(tx.id)} aria-label="Copy transaction ID" title="Copy transaction ID">
          📋
        </button>
        <button
          type="button"
          className="swipe-btn details"
          onClick={() => onDetails(tx)}
          aria-label="View transaction diagnostics"
          title="View Details"
        >
          🔍
        </button>
      </div>
      <motion.div
        className={`tx-item ${tx.status}`}
        tabIndex={0}
        drag="x"
        dragConstraints={{ left: -140, right: 0 }}
        dragElastic={0.05}

        whileDrag={{ scale: 1.02 }}
        whileFocus={{
          scale: 1.01,
          borderColor: 'var(--primary)',
          boxShadow: '0 0 0 2px var(--primary-glow)',
          outline: 'none'
        }}
        onContextMenu={(e) => onContextMenu(e, tx)}
        style={{ willChange: 'transform' }}
        {...longPressHandlers}
      >
        <div 
          className="tx-status-dot" 
          aria-label={`Status: ${tx.status}`} 
          role="img"
        />
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
            <button type="button" className="text-btn" onClick={() => onCopy(tx.id)} aria-label={`Copy transaction ID ${tx.id}`}>
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
              <button 
                type="button" 
                onClick={() => onOpenExplorer(tx)} 
                className="tx-explorer-link ghost-button btn-xs"
                aria-label={`View transaction ${txId} on Explorer`}
              >
                {highlightText(truncateAddress(txId, 8), searchTerm)} ↗
              </button>
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
    isPending: PropTypes.bool,
    explorerUrl: PropTypes.string,
  }).isRequired,
  searchTerm: PropTypes.string,
  highlightText: PropTypes.func.isRequired,
  onDetails: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  onOpenExplorer: PropTypes.func.isRequired,
};

TransactionItem.displayName = 'TransactionItem';

export default memo(TransactionItem);
