import PropTypes from 'prop-types';
import NetworkLogo from './NetworkLogo';
import AddressBadge from './common/AddressBadge';
import Tooltip from './common/Tooltip';
import { useWallet } from '../context/WalletContext';
import { useI18n } from '../context/I18nContext';
import { useScrollPosition } from '../hooks/useScrollPosition';

const LANGUAGE_LABELS = {
  en: 'EN',
  es: 'ES',
  fr: 'FR',
  pt: 'PT',
  de: 'DE',
};
const DEFAULT_SUPPORTED_LANGS = ['en', 'es', 'fr', 'pt', 'de'];

/**
 * Main application header component.
 * Manages the logo, language selector, theme toggle, and wallet connection state.
 *
 * @param {Object} props - Component props.
 * @param {string} props.theme - Current theme ('dark' or 'light').
 * @param {Function} props.toggleTheme - Function to toggle between themes.
 */
export default function Header({ theme = 'dark', toggleTheme }) {
  const { address, connectWallet, disconnectWallet, isConnecting } = useWallet();
  const { lang, setLang, supportedLangs = DEFAULT_SUPPORTED_LANGS } = useI18n();
  const { y } = useScrollPosition();
  const isScrolled = y > 12;

  return (
    <header
      className={`app-header ${isScrolled ? 'header-scrolled' : ''}`}
      role="banner"
      title="Main application header"
    >
      <div className="header-content">
        <div
          className="logo"
          role="img"
          aria-label="Stacks Clicker logo"
          title="Stacks Clicker V2 Logo"
        >
          <NetworkLogo isSyncing={isScrolled} />
          <div className="brand-copy">
            <h1 className="header-title">Stacks Clicker</h1>
            <span className="brand-subtitle">Bitcoin L2 activity hub</span>
          </div>
        </div>

        <div className="wallet-section" role="group" aria-label="Wallet Connection Utilities">
          <select
            className="language-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Select application language"
            title="Application language"
          >
            {supportedLangs.map((code) => (
              <option key={code} value={code}>
                {LANGUAGE_LABELS[code] ?? code.toUpperCase()}
              </option>
            ))}
          </select>
          <Tooltip text={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Toggle to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              aria-pressed={theme === 'dark'}
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
                aria-label="Disconnect wallet session"
                title="Disconnect wallet"
              >
                <span className="logout-icon" aria-hidden="true">
                  🚪
                </span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn-connect"
              onClick={connectWallet}
              aria-label="Connect Stacks Wallet to begin playing"
              title="Connect Stacks wallet"
              aria-busy={isConnecting}
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']),
  toggleTheme: PropTypes.func.isRequired,
};
