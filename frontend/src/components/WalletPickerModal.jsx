import PropTypes from 'prop-types';

/**
 * WalletPickerModal - Choose between Hiro Wallet / Leather or WalletConnect.
 *
 * @param {Object} props
 * @param {Function} props.onSelectHiro - Called when user picks Hiro/Leather
 * @param {Function} props.onSelectWalletConnect - Called when user picks WalletConnect
 * @param {Function} props.onClose - Called when modal is dismissed
 */
export default function WalletPickerModal({ onSelectHiro, onSelectWalletConnect, onClose }) {
  return (
    <div
      className="qr-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="wallet-picker-title"
    >
      <div
        className="qr-modal"
        onClick={(e) => e.stopPropagation()}
        tabIndex="-1"
      >
        <div className="qr-modal-header">
          <h3 id="wallet-picker-title">Connect a Wallet</h3>
          <button
            type="button"
            className="qr-modal-close"
            onClick={onClose}
            aria-label="Close wallet picker"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="qr-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            type="button"
            onClick={onSelectHiro}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px', borderRadius: 10,
              background: 'var(--accent, #f97316)', color: '#fff',
              border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, width: '100%',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
              <rect width="24" height="24" rx="6" fill="white" fillOpacity=".2"/>
              <path d="M12 4L5 8.5V15.5L12 20L19 15.5V8.5L12 4Z" stroke="white" strokeWidth="1.5" fill="none"/>
              <circle cx="12" cy="12" r="2.5" fill="white"/>
            </svg>
            Hiro Wallet / Leather
          </button>

          <button
            type="button"
            onClick={onSelectWalletConnect}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px', borderRadius: 10,
              background: 'rgba(255,255,255,0.07)', color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: 15, fontWeight: 600, width: '100%',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
              <rect width="24" height="24" rx="6" fill="white" fillOpacity=".08"/>
              <path d="M7 9.5C9.5 7 14.5 7 17 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 12C10.5 10.5 13.5 10.5 15 12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="14.5" r="1.5" fill="white"/>
            </svg>
            WalletConnect (Mobile / QR)
          </button>
        </div>
      </div>
    </div>
  );
}

WalletPickerModal.propTypes = {
  onSelectHiro: PropTypes.func.isRequired,
  onSelectWalletConnect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
