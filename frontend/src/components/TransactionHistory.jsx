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
  const [selectedTx, setSelectedTx] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (e, tx) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      tx
    });
  };

  const closeContextMenu = () => setContextMenu(null);

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
        <div className="tx-export-actions">
          <button className="export-btn" onClick={() => exportData('json')} title="Export as JSON">JSON</button>
          <button className="export-btn" onClick={() => exportData('csv')} title="Export as CSV">CSV</button>
        </div>
      </div>

      <AnimatePresence>
        {contextMenu && (
          <>
            <div className="context-menu-backdrop" onClick={closeContextMenu} />
            <motion.div
              className="context-menu"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ top: contextMenu.y, left: contextMenu.x }}
            >
              <button onClick={() => { setSelectedTx(contextMenu.tx); closeContextMenu(); }}>
                🔍 View Details
              </button>
              <button onClick={() => { navigator.clipboard.writeText(contextMenu.tx.id); closeContextMenu(); }}>
                📋 Copy ID
              </button>
              {!contextMenu.tx.id.startsWith('pending') && (
                <button onClick={() => { window.open(`https://explorer.hiro.so/txid/${contextMenu.tx.id}?chain=mainnet`, '_blank'); closeContextMenu(); }}>
                  🌐 View on Explorer
                </button>
              )}
            </motion.div>
          </>
        )}
        {selectedTx && (
          <div className="modal-overlay" onClick={() => setSelectedTx(null)}>
            <motion.div
              className="modal-content tx-details-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h4>Transaction Details</h4>
                <button className="close-btn" onClick={() => setSelectedTx(null)}>×</button>
              </div>
              <div className="modal-body">
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
                <div className="detail-row full">
                  <label>Raw Metadata</label>
                  <pre className="raw-json">
                    {JSON.stringify({
                      network: 'mainnet',
                      fee: '0.001 STX',
                      nonce: Math.floor(Math.random() * 100),
                      version: 'v2'
                    }, null, 2)}
                  </pre>
                </div>
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
                onContextMenu={(e) => handleContextMenu(e, tx)}
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
                    <button className="text-btn" onClick={() => setSelectedTx(tx)}>Details</button>
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
