import PropTypes from 'prop-types';
import NetworkLogo from './NetworkLogo';
import AddressBadge from './common/AddressBadge';
import Tooltip from './common/Tooltip';
import { useWallet } from '../context/WalletContext';
import { useI18n } from '../context/I18nContext';
import { useScrollPosition } from '../hooks/useScrollPosition';

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
  const { y } = useScrollPosition();
  const isScrolled = y > 12;

  return (
    <header
      className={`app-header ${isScrolled ? 'header-scrolled' : ''}`}
      role="banner"
      style={{
        backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
        backgroundColor: isScrolled ? 'var(--glass-bg-scrolled)' : 'transparent',
        borderBottom: isScrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="header-content">
        <div
          className="logo"
          role="img"
          aria-label="Stacks Clicker logo"
          title="Stacks Clicker V2 Logo"
        >
          <NetworkLogo isSyncing={isScrolled} />
          <h1 className="header-title text-gradient">Stacks Clicker</h1>
        </div>

        <div className="wallet-section" role="group" aria-label="Wallet Connection Utilities">
          <select
            className="language-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Select application language"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
            <option value="de">DE</option>
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
                <span className="logout-icon" aria-hidden="true">🚪</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn-connect"
              onClick={connectWallet}
              aria-label="Connect Stacks Wallet to begin playing"
              title="Connect Stacks wallet"
            >
              Connect Wallet
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

Header.defaultProps = {
  theme: 'dark',
};
