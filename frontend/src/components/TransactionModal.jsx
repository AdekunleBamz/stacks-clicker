import { memo } from 'react';
import PropTypes from 'prop-types';
import Modal from './common/Modal';
import { useModal } from '../context/ModalContext';
import { truncateAddress } from '../utils/format';
import { STACKS_NETWORK } from '../utils/constants';

/**
 * Modal to view detailed information about a specific transaction.
 */
const TransactionModal = memo(() => {
  const { activeModal, modalData, closeModal } = useModal();

  if (activeModal !== 'transaction' || !modalData) return null;

  const { txId, action, timestamp, status = 'success' } = modalData;

  const getExplorerLink = () => {
    if (!txId) return '#';
    return `https://explorer.hiro.so/txid/${txId}?chain=${STACKS_NETWORK}`;
  };

  return (
    <Modal
      isOpen={true}
      onClose={closeModal}
      title="🔍 Transaction Details"
    >
      <div className="tx-details-container" title="Transaction details">

        <div className="detail-row">
          <span className="detail-label">Action</span>
          <span className="detail-value highlight">{action}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Status</span>
          <span className={`detail-value status-badge badge-${status}`}>
            {status.toUpperCase()}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Time</span>
          <span className="detail-value">
            <time dateTime={new Date(timestamp).toISOString()}>
              {new Date(timestamp).toLocaleString()}
            </time>
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Transaction ID</span>
          <span className="detail-value monospace" title={txId} aria-label={`Full transaction ID: ${txId}`}>
            {truncateAddress(txId)}
          </span>
        </div>

        <div className="modal-actions">
          <a
            href={getExplorerLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button explorer-btn"
            aria-label={`View transaction ${truncateAddress(txId)} on explorer`}
            title="Open in Stacks explorer (new tab)"
          >
            View on Explorer ↗
          </a>
        </div>
      </div>

      <style>{`
        .tx-details-container {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
        }

        .detail-label {
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .detail-value {
          color: var(--text-main);
          font-weight: 500;
        }

        .highlight {
          color: var(--primary);
          font-weight: 700;
        }

        .monospace {
          font-family: monospace;
          background: rgba(0,0,0,0.2);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .modal-actions {
          margin-top: 1rem;
          display: flex;
          justify-content: stretch;
        }

        .explorer-btn {
          width: 100%;
          text-align: center;
          text-decoration: none;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 800;
        }

        .badge-success { background: rgba(16, 185, 129, 0.2); color: var(--success); }
        .badge-pending { background: rgba(245, 158, 11, 0.2); color: var(--warning); }
        .badge-error { background: rgba(239, 68, 68, 0.2); color: var(--error); }
      `}</style>
    </Modal>
  );
};

export default TransactionModal;
