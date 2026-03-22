import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { getWalletConnectLink } from '../utils/walletconnect';
import { notify } from '../utils/toast';

/**
 * WalletConnect QR Modal
 *
 * Displays the pairing QR code for WalletConnect.
 * Also shows a camera-friendly link for mobile users.
 */
export default function WalletConnectQRModal({ uri, onClose }) {
  if (!uri) return null;

  // Camera-friendly link (wc: URIs don't work with phone cameras)
  const wcLink = getWalletConnectLink(uri);
  const handleCopy = async () => {
    if (!navigator?.clipboard?.writeText) {
      notify.error('Clipboard access is unavailable.');
      return;
    }
    try {
      await navigator.clipboard.writeText(uri);
      notify.success('Pairing URI copied.');
    } catch {
      notify.error('Could not copy pairing URI.');
    }
  };

  return (
    <div className="qr-modal-overlay" onClick={onClose} aria-hidden="true">
      <div className="qr-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="qr-modal-title">
        <div className="qr-modal-header">
          <h3 id="qr-modal-title" aria-label="Connect Wallet Modal Header">Connect Wallet</h3>
          <button type="button" className="qr-modal-close" onClick={onClose} aria-label="Close URI Pairing Modal">
            ×
          </button>
        </div>

        <div className="qr-modal-body">
          <p className="qr-instructions">Scan this QR code with your Stacks wallet app</p>

          <div className="qr-code-container">
            <QRCodeSVG
              value={uri}
              size={256}
              level="M"
              includeMargin={true}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          <div className="qr-mobile-help">
            <p className="qr-help-text">📱 On mobile? Open your wallet app and scan the QR, or:</p>
            <a href={wcLink} target="_blank" rel="noopener noreferrer" className="qr-mobile-link">
              Open in Wallet App →
            </a>
            <button 
              type="button" 
              className="qr-copy-btn" 
              onClick={handleCopy}
              title="Copy pairing link"
            >
              <span aria-hidden="true">📋</span> Copy Pairing URI
            </button>
          </div>

          <div className="qr-supported-wallets">
            <p>Supported wallets:</p>
            <div className="wallet-icons">
              <span className="wallet-badge">Xverse</span>
              <span className="wallet-badge">Leather</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
