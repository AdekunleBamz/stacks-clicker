import React, { useState, memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { notify } from '../utils/toast';
import SkeletonLoader from './common/SkeletonLoader';
import SearchInput from './common/SearchInput';
import TransactionItem from './TransactionItem';
import BaseModal from './common/BaseModal';
import { useDebounce } from '../hooks/useDebounce';
import { useClipboard } from '../hooks/useClipboard';

function escapeCsvValue(value) {
  const normalized = String(value ?? '').replace(/"/g, '""');
  return `"${normalized}"`;
}

/**
 * Component to display a list of recent transactions with status indicators.
 * @param {Object} props - Component props.
 * @param {Array} props.txLog - Array of transaction objects.
 * @returns {JSX.Element} The rendered transaction history section.
 */
function TransactionHistory({ txLog }) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [selectedTx, setSelectedTx] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAction, setFilterAction] = useState('all');
  const [visibleItems, setVisibleItems] = useState(10);
  const [modalView, setModalView] = useState('summary'); // 'summary' or 'raw'
  const { copyToClipboard } = useClipboard();
  // We no longer need closeBtnRef or the useEffect here as BaseModal handles it

  const handleModalClose = useCallback(() => {
    setSelectedTx(null);
    setModalView('summary');
  }, []);

  const handleContextMenu = useCallback((e, tx) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      tx,
    });
  }, []);

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  const filteredLog = useMemo(() => {
    return txLog.filter((tx) => {
      const actionText = String(tx.action ?? '').toLowerCase();
      const idText = String(tx.id ?? '').toLowerCase();
      const search = debouncedSearchTerm.toLowerCase();
      const matchesSearch =
        actionText.includes(search) ||
        idText.includes(search);
      const matchesStatus = filterStatus === 'all' || tx.status === filterStatus;
      const matchesAction = filterAction === 'all' || tx.action.toLowerCase().includes(filterAction.toLowerCase());
      return matchesSearch && matchesStatus && matchesAction;
    });
  }, [txLog, debouncedSearchTerm, filterStatus, filterAction]);

  const highlightText = useCallback((text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="search-highlight">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  }, []);

  const exportData = useCallback(
    (format) => {
      let content = '';
      const filename = `stacks-tx-history-${new Date().toISOString().split('T')[0]}`;

      if (format === 'json') {
        content = JSON.stringify(txLog, null, 2);
      } else if (format === 'csv') {
        const headers = ['Action', 'Time', 'ID', 'Status', 'Network'];
        const rows = txLog.map((tx) =>
          [tx.action, tx.time, tx.id, tx.status, tx.network || ''].map(escapeCsvValue).join(',')
        );
        content = [headers.join(','), ...rows].join('\n');
      }

      const blob = new Blob([content], {
        type: format === 'json' ? 'application/json' : 'text/csv',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.${format}`;
      link.click();
      URL.revokeObjectURL(url);
    },
    [txLog]
  );

  const copyText = useCallback(async (value, label = 'Value') => {
    copyToClipboard(value);
  }, [copyToClipboard]);

  const openExplorer = useCallback((tx) => {
    if (!tx.explorerUrl) {
      notify.error('Pending transactions do not have an explorer link yet');
      return;
    }

    window.open(tx.explorerUrl, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <section className="tx-log" aria-labelledby="tx-history-title">
      <div className="log-header">
        <h3 id="tx-history-title" aria-label="Recent Account Activity Log">📜 Recent Activity</h3>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={() => setSearchTerm('')}
          placeholder="Search action or ID..."
          aria-label="Search transaction history"
          count={filteredLog.length}
        />
        <div className="tx-export-actions" role="toolbar" aria-label="Export and Filter Data">
          <select
            className="tx-filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            aria-label="Filter transaction history list by specific processing status"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <select
            className="tx-filter-select"
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            aria-label="Filter transactions by action type"
          >
            <option value="all">All Types</option>
            <option value="Click">Clicks</option>
            <option value="Tip">Tips</option>
            <option value="Vote">Votes</option>
            <option value="Ping">Pings</option>
          </select>
          <button
            type="button"
            className="export-btn secondary-button btn-sm"
            onClick={() => exportData('json')}
            aria-label="Export history as JSON"
            title="Export as JSON"
          >
            JSON
          </button>
          <button
            type="button"
            className="export-btn secondary-button btn-sm"
            onClick={() => exportData('csv')}
            aria-label="Export history as CSV"
            title="Export as CSV"
          >
            CSV
          </button>
        </div>
      </div>

      <AnimatePresence>
        {contextMenu && (
          <div key="ctx-wrapper">
            <div className="context-menu-backdrop" onClick={closeContextMenu} aria-hidden="true" />
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
                type="button"
                role="menuitem"
                title="View full diagnostics payload"
                onClick={() => {
                  setSelectedTx(contextMenu.tx);
                  closeContextMenu();
                }}
              >
                🔍 View Details
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  copyText(contextMenu.tx.id, 'ID');
                  closeContextMenu();
                }}
              >
                📋 Copy ID
              </button>
              {contextMenu.tx.explorerUrl && (
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    openExplorer(contextMenu.tx);
                    closeContextMenu();
                  }}
                >
                  🌐 View on Explorer
                </button>
              )}
            </motion.div>
          </div>
        )}
        <BaseModal
          isOpen={!!selectedTx}
          onClose={handleModalClose}
          title={
            <div className="modal-breadcrumbs">
              <button
                type="button"
                className={`breadcrumb-item ${modalView === 'summary' ? 'active' : ''}`}
                onClick={() => setModalView('summary')}
              >
                Summary
              </button>
              {modalView === 'raw' && (
                <>
                  <span className="breadcrumb-separator">/</span>
                  <button type="button" className="breadcrumb-item active">
                    Raw Data
                  </button>
                </>
              )}
            </div>
          }
          className="tx-details-modal"
          footer={
            selectedTx?.explorerUrl ? (
              <a
                href={selectedTx.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn primary-button"
                style={{ textDecoration: 'none', width: '100%', justifyContent: 'center' }}
              >
                View on Explorer ↗
              </a>
            ) : (
              <button type="button" className="action-btn primary-button" disabled>
                Explorer unavailable
              </button>
            )
          }
        >
          {selectedTx && (
            <div className="modal-body-content">
              {modalView === 'summary' ? (
                <div className="summary-view">
                  <div className="detail-row">
                    <label>Action Type</label>
                    <span className="action-value">{selectedTx.action}</span>
                  </div>
                  <div className="detail-row">
                    <label>Time of Action</label>
                    <span className="time-value">{selectedTx.time}</span>
                  </div>
                  <div className="detail-row">
                    <label>Transaction ID</label>
                    <code className="tx-id-full" title={selectedTx.id}>
                      {selectedTx.id}
                    </code>
                  </div>
                  <div className="detail-row">
                    <label>Transaction Status</label>
                    <span className={`status-badge ${selectedTx.status}`}>
                      {selectedTx.status}
                    </span>
                  </div>
                  <div className="detail-row">
                    <label>Network</label>
                    <span>{selectedTx.network || 'mainnet'}</span>
                  </div>
                  <button type="button" className="text-btn mt-2" onClick={() => setModalView('raw')}>
                    View Technical Raw Data ↗
                  </button>
                </div>
              ) : (
                <div className="detail-row full">
                  <label>Raw Metadata</label>
                  <pre className="raw-json">
                    {JSON.stringify(
                      {
                        id: selectedTx.id,
                        action: selectedTx.action,
                        status: selectedTx.status,
                        network: selectedTx.network || 'mainnet',
                        submittedAt: selectedTx.submittedAt || null,
                        explorerUrl: selectedTx.explorerUrl || null,
                        tx_id: selectedTx.id,
                        timestamp: selectedTx.time,
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              )}
            </div>
          )}
        </BaseModal>
      </AnimatePresence>

      <div className="tx-list" role="list">
        <AnimatePresence mode="popLayout">
          {filteredLog.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="empty"
              className="empty-state"
              role="status"
              aria-live="polite"
            >
              <div className="empty-icon">{searchTerm ? '🔍' : '📂'}</div>
              <p className="empty-copy">
                {searchTerm
                  ? `No matches for "${searchTerm}".`
                  : 'No transactions yet. Submit a click, tip, or vote to populate this feed.'}
              </p>
              {searchTerm && (
                <button type="button" className="text-btn mt-2" onClick={() => setSearchTerm('')}>
                  Reset search
                </button>
              )}
              {!searchTerm && (
                <div className="skeleton-placeholder" aria-hidden="true">
                  <SkeletonLoader height="60px" borderRadius="12px" className="mb-2" />
                  <SkeletonLoader height="60px" borderRadius="12px" opacity={0.5} />
                </div>
              )}
              {!searchTerm && <p className="empty-helper">Tip: Keyboard shortcuts are C for click and T for tip.</p>}
            </motion.div>
          ) : (
            filteredLog.slice(0, visibleItems).map((tx) => (
              <TransactionItem
                key={tx.id}
                tx={tx}
                searchTerm={searchTerm}
                highlightText={highlightText}
                onDetails={setSelectedTx}
                onCopy={(id) => copyText(id, 'ID')}
                onContextMenu={handleContextMenu}
                onOpenExplorer={openExplorer}
              />
            ))
          )}
        </AnimatePresence>
        {filteredLog.length > visibleItems && (
          <button
            type="button"
            className="load-more-btn secondary-button"
            style={{ width: '100%', marginTop: '1rem' }}
            onClick={() => setVisibleItems((prev) => prev + 10)}
            aria-label={`Show ${Math.min(10, filteredLog.length - visibleItems)} more transactions`}
          >
            Load More Activity ({filteredLog.length - visibleItems} remaining)
          </button>
        )}
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
      time: PropTypes.string.isRequired,
      network: PropTypes.string,
      submittedAt: PropTypes.string,
      explorerUrl: PropTypes.string,
      isPending: PropTypes.bool,
    })
  ).isRequired,
};

export default memo(TransactionHistory);
