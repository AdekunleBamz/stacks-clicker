import React from 'react';
import { motion } from 'framer-motion';
import NetworkHeartbeat from './NetworkHeartbeat';
import { useWallet } from '../context/WalletContext';
import { useI18n } from '../context/I18nContext';

/**
 * Main application header component.
 * Manages the logo, language selector, theme toggle, and wallet connection state.
 *
 * @param {Object} props - Component props.
 * @param {string} props.theme - Current theme ('dark' or 'light').
 * @param {Function} props.toggleTheme - Function to toggle between themes.
 */
export default function Header({ theme, toggleTheme }) {
  const { address, connectWallet, disconnectWallet } = useWallet();
  const { lang, setLang } = useI18n();

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <NetworkHeartbeat />
          <NetworkLogo />
          <span className="logo-text">Stacks Clicker V2</span>
        </div>

        <div className="wallet-section">
          <select
            className="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {address ? (
            <div className="wallet-info">
              <span className="address-badge">{address.slice(0, 6)}...{address.slice(-4)}</span>
              <button className="btn-disconnect" onClick={disconnectWallet}>Disconnect</button>
            </div>
          ) : (
            <button className="btn-connect" onClick={connectWallet}>Connect Wallet</button>
          )}
        </div>
      </div>
    </header>
  );
}
