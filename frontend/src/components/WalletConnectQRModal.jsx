import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { getWalletConnectLink } from '../utils/walletconnect';

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

  return (
    <div className="qr-modal-overlay" onClick={onClose}>
      <div className="qr-modal" onClick={e => e.stopPropagation()}>
        <div className="qr-modal-header">
          <h3>Connect Wallet</h3>
          <button className="qr-modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="qr-modal-body">
          <p className="qr-instructions">
            Scan this QR code with your Stacks wallet app
          </p>
          
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
            <p className="qr-help-text">
              📱 On mobile? Open your wallet app and scan the QR, or:
            </p>
            <a 
              href={wcLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="qr-mobile-link"
            >
              Open in Wallet App →
            </a>
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
