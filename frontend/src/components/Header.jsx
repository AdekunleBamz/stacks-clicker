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
          <motion.div
            className="logo-glow"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L4 16L16 30L28 16L16 2Z" fill="url(#logo-grad)" />
              <path d="M16 6L8 16L16 26L24 16L16 6Z" fill="white" fillOpacity="0.2" />
              <defs>
                <linearGradient id="logo-grad" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
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
