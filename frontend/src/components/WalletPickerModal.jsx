import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

/**
 * WalletPickerModal - Modern wallet selection dialog.
 *
 * @param {Object} props
 * @param {Function} props.onSelectHiro - Called when user picks Hiro/Leather
 * @param {Function} props.onSelectWalletConnect - Called when user picks WalletConnect
 * @param {Function} props.onClose - Called when modal is dismissed
 */
export default function WalletPickerModal({ onSelectHiro, onSelectWalletConnect, onClose }) {
  const modalRef = useRef(null);

  // Close on Escape, trap focus
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    modalRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="wp-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="wp-title"
    >
      <div
        className="wp-sheet"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        tabIndex="-1"
      >
        {/* Header */}
        <div className="wp-header">
          <div className="wp-logo-ring">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path d="M14 3L4 8.5v11L14 25l10-5.5v-11L14 3Z" stroke="url(#wpg)" strokeWidth="1.5" fill="none"/>
              <circle cx="14" cy="14" r="3" fill="url(#wpg)"/>
              <defs>
                <linearGradient id="wpg" x1="4" y1="3" x2="24" y2="25" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#5546ff"/>
                  <stop offset="1" stopColor="#00d4aa"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h3 id="wp-title" className="wp-title">Connect Wallet</h3>
            <p className="wp-subtitle">Choose how you want to connect</p>
          </div>
          <button type="button" className="wp-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Wallet options */}
        <div className="wp-options">
          {/* Hiro / Leather — primary */}
          <button type="button" className="wp-option wp-option--primary" onClick={onSelectHiro}>
            <span className="wp-option-icon wp-option-icon--hiro">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3L4 7.5v9L12 21l8-4.5v-9L12 3Z" stroke="white" strokeWidth="1.4" fill="none"/>
                <circle cx="12" cy="12" r="2.5" fill="white"/>
              </svg>
            </span>
            <span className="wp-option-text">
              <span className="wp-option-name">Hiro Wallet / Leather</span>
              <span className="wp-option-desc">Browser extension · Most popular</span>
            </span>
            <span className="wp-option-badge">Recommended</span>
            <svg className="wp-option-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* WalletConnect */}
          <button type="button" className="wp-option wp-option--secondary" onClick={onSelectWalletConnect}>
            <span className="wp-option-icon wp-option-icon--wc">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6.5 9.5C9 7 15 7 17.5 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8.5 12C10 10.5 14 10.5 15.5 12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="14.5" r="1.5" fill="white"/>
              </svg>
            </span>
            <span className="wp-option-text">
              <span className="wp-option-name">WalletConnect</span>
              <span className="wp-option-desc">Mobile wallets · QR code</span>
            </span>
            <svg className="wp-option-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <p className="wp-footer">
          Your keys, your coins. We never store credentials.
        </p>
      </div>
    </div>
  );
}

WalletPickerModal.propTypes = {
  onSelectHiro: PropTypes.func.isRequired,
  onSelectWalletConnect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

