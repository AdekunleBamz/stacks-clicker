import NetworkHeartbeat from './NetworkHeartbeat';
import NetworkLogo from './NetworkLogo';
import AddressBadge from './common/AddressBadge';
import Tooltip from './common/Tooltip';
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
            aria-label="Select Language"
          >
            <option value="en">English (EN)</option>
            <option value="es">Español (ES)</option>
          </select>
          <Tooltip content={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Toggle to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </Tooltip>

          {address ? (
            <AddressBadge address={address} onDisconnect={disconnectWallet} />
          ) : (
            <button
              type="button"
              className="btn-connect"
              onClick={connectWallet}
              aria-label="Connect Stacks Wallet"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
