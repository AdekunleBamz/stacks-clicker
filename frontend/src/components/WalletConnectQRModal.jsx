import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
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
  const handleCopy = useCallback(async () => {
    if (!navigator?.clipboard?.writeText) {
      notify.error('Clipboard not available');
      return;
    }

    try {
      await navigator.clipboard.writeText(uri);
      notify.success('Pairing URI copied');
    } catch {
      notify.error('Unable to copy pairing URI');
    }
  }, [uri]);

  return (
    <div className="qr-modal-overlay" onClick={onClose} role="presentation">
      <div className="qr-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="qr-modal-title" tabIndex="-1">
        <div className="qr-modal-header">
          <h3 id="qr-modal-title">Connect Wallet</h3>
          <button type="button" className="qr-modal-close" onClick={onClose} aria-label="Close URI Pairing Modal" title="Close">
            <span aria-hidden="true">×</span>
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
            <p className="qr-help-text"><span aria-hidden="true">📱</span> On mobile? Open your wallet app and scan the QR, or:</p>
            <a href={wcLink} target="_blank" rel="noopener noreferrer" className="qr-mobile-link" aria-label="Open pairing link in wallet app">
              Open in Wallet App <span aria-hidden="true">→</span>
            </a>
            <button
              type="button"
              className="qr-copy-btn"
              onClick={handleCopy}
              title="Copy pairing link"
              aria-label="Copy WalletConnect pairing URI to clipboard"
            >
              <span aria-hidden="true">📋</span> Copy Pairing URI
            </button>
          </div>

          <div className="qr-supported-wallets" role="region" aria-label="Supported Wallets List">
            <p id="qr-wallet-desc">Supported wallets:</p>
            <div className="wallet-icons" aria-labelledby="qr-wallet-desc">
              <span className="wallet-badge">Xverse</span>
              <span className="wallet-badge">Leather</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

WalletConnectQRModal.propTypes = {
  uri: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

WalletConnectQRModal.defaultProps = {
  uri: '',
};

