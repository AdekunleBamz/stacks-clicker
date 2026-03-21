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
        <div 
          className="logo" 
          role="banner" 
          aria-label="Application Logo"
          title="Stacks Clicker V2 Logo"
        >
          <NetworkHeartbeat />
          <NetworkLogo />
          <span className="logo-text">Stacks Clicker V2</span>
        </div>

        <div className="wallet-section">
          <select
            className="language-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Select application language"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
          </select>
          <Tooltip content={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Toggle to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title="Toggle application display theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </Tooltip>

          {address ? (
            <div className="wallet-connected">
              <AddressBadge address={address} />
              <button
                type="button"
                className="btn-logout"
                onClick={disconnectWallet}
                aria-label="Logout"
                title="Logout"
              >
                <span className="logout-icon" aria-hidden="true">🚪</span>
              </button>
            </div>
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
