import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import SkeletonLoader from './common/SkeletonLoader';
import SearchInput from './common/SearchInput';
import TransactionItem from './TransactionItem';

/**
 * Component to display a list of recent transactions with status indicators.
 * @param {Object} props - Component props.
 * @param {Array} props.txLog - Array of transaction objects.
 * @returns {JSX.Element} The rendered transaction history section.
 */
export default function TransactionHistory({ txLog }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTx, setSelectedTx] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [modalView, setModalView] = useState('summary'); // 'summary' or 'raw'

  const handleContextMenu = (e, tx) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      tx
    });
  };

  const closeContextMenu = () => setContextMenu(null);

  const filteredLog = txLog.filter(tx => {
    const matchesSearch = tx.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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

  const exportData = (format) => {
    let content = '';
    const filename = `stacks-tx-history-${new Date().toISOString().split('T')[0]}`;

    if (format === 'json') {
      content = JSON.stringify(txLog, null, 2);
    } else if (format === 'csv') {
      const headers = ['Action', 'Time', 'ID', 'Status'];
      const rows = txLog.map(tx => [tx.action, tx.time, tx.id, tx.status].join(','));
      content = [headers.join(','), ...rows].join('\n');
    }

    const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.${format}`;
    link.click();
    URL.revokeObjectURL(url);
  };
  return (
    <section className="tx-log" aria-labelledby="tx-history-title">
      <div className="log-header">
        <h3 id="tx-history-title">📜 Recent Activity</h3>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={() => setSearchTerm('')}
          placeholder="Search action or ID..."
          count={filteredLog.length}
        />
        <div className="tx-export-actions">
          <select
            className="tx-filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            aria-label="Filter transactions by status"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <button className="export-btn" onClick={() => exportData('json')} aria-label="Export history as JSON" title="Export as JSON">JSON</button>
          <button className="export-btn" onClick={() => exportData('csv')} aria-label="Export history as CSV" title="Export as CSV">CSV</button>
        </div>
      </div>

      <AnimatePresence>
        {contextMenu && (
          <div key="ctx-wrapper">
            <div className="context-menu-backdrop" onClick={closeContextMenu} />
            <motion.div
              className="context-menu"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ top: contextMenu.y, left: contextMenu.x }}
              role="menu"
              aria-label="Transaction actions"
            >
              <button
                role="menuitem"
                onClick={() => { setSelectedTx(contextMenu.tx); closeContextMenu(); }}
              >
                🔍 View Details
              </button>
              <button
                role="menuitem"
                onClick={() => { navigator.clipboard.writeText(contextMenu.tx.id); closeContextMenu(); }}
              >
                📋 Copy ID
              </button>
              {!contextMenu.tx.id.startsWith('pending') && (
                <button
                  role="menuitem"
                  onClick={() => { window.open(`https://explorer.hiro.so/txid/${contextMenu.tx.id}?chain=mainnet`, '_blank'); closeContextMenu(); }}
                >
                  🌐 View on Explorer
                </button>
              )}
            </motion.div>
          </div>
        )}
        {selectedTx && (
          <div className="modal-overlay" key="modal-wrapper" onClick={() => setSelectedTx(null)}>
            <motion.div
              className="modal-content tx-details-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-breadcrumbs">
                  <button
                    className={`breadcrumb-item ${modalView === 'summary' ? 'active' : ''}`}
                    onClick={() => setModalView('summary')}
                  >
                    Summary
                  </button>
                  {modalView === 'raw' && (
                    <>
                      <span className="breadcrumb-separator">/</span>
                      <button className="breadcrumb-item active">Raw Data</button>
                    </>
                  )}
                </div>
                <button className="close-btn" onClick={() => { setSelectedTx(null); setModalView('summary'); }}>×</button>
              </div>
              <div className="modal-body">
                {modalView === 'summary' ? (
                  <div className="summary-view">
                    <div className="detail-row">
                      <label>Action</label>
                      <span>{selectedTx.action}</span>
                    </div>
                <div className="detail-row">
                  <label>Timestamp</label>
                  <span>{selectedTx.time}</span>
                </div>
                <div className="detail-row">
                  <label>Transaction ID</label>
                  <code className="tx-id-full">{selectedTx.id}</code>
                </div>
                    <div className="detail-row">
                      <label>Status</label>
                      <span className={`status-badge ${selectedTx.status}`}>{selectedTx.status}</span>
                    </div>
                    <button className="text-btn mt-2" onClick={() => setModalView('raw')}>
                      View Technical Raw Data ↗
                    </button>
                  </div>
                ) : (
                  <div className="detail-row full">
                    <label>Raw Metadata</label>
                    <pre className="raw-json">
                      {JSON.stringify({
                        network: 'mainnet',
                        fee: '0.001 STX',
                        nonce: Math.floor(Math.random() * 100),
                        version: 'v2',
                        tx_id: selectedTx.id,
                        timestamp: selectedTx.time
                      }, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <a
                  href={`https://explorer.hiro.so/txid/${selectedTx.id}?chain=mainnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn primary"
                  style={{ textDecoration: 'none', justifyContent: 'center' }}
                >
                  View on Explorer ↗
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="tx-list">
        <AnimatePresence mode="popLayout">
          {filteredLog.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
              <TransactionItem
                key={tx.id}
                tx={tx}
                searchTerm={searchTerm}
                highlightText={highlightText}
                onDetails={setSelectedTx}
                onCopy={(id) => {
                  navigator.clipboard.writeText(id);
                  toast.success('ID Copied');
                }}
                onContextMenu={handleContextMenu}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

TransactionHistory.propTypes = {
  txLog: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
  })).isRequired
};
