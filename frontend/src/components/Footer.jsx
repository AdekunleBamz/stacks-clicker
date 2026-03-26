import React, { memo } from 'react';
import versionData from '../version.json';

/**
 * Standard application footer component.
 * Displays copyright information, version number, and social media links.
 * Memoized to prevent unnecessary re-renders since it has no dynamic props.
 *
 * @component
 * @returns {JSX.Element} The rendered footer
 */
const VERSION = versionData.version || '1.0.0';
const CURRENT_YEAR = new Date().getFullYear();

const Footer = memo(function Footer() {
  return (
    <footer 
      ref={ref}
      className={`app-footer ${isVisible ? 'footer-visible' : ''}`} 
      role="contentinfo" 
      aria-label="Global Application Footer"
    >
      <div className="footer-content glass-card" style={{ willChange: 'transform' }}>
        <section className="footer-left" aria-label="Copyright and Version info">
          <small className="copyright-text">
            &copy; {currentYear} • <strong>Stacks Clicker</strong> • Built with <span role="img" aria-label="love">❤️</span> on Stacks
          </small>
          <span className="app-version badge" aria-label={`Current Interface Version: ${version}`} title="Current Interface Version">
            v{version}
          </span>
        </section>
        
        <nav className="footer-links" aria-label="Social and Community Links">
          <ul className="social-links-list" style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0 }}>
            <li>
              <a 
                href="https://twitter.com/stacks" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="Follow Stacks on Twitter"
                title="Follow Stacks on Twitter"
              >
                <span aria-hidden="true">🐦</span> Twitter
              </a>
            </li>
            <li>
              <a 
                href="https://discord.gg/stacks" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="Join Stacks Discord"
                title="Join Stacks Discord"
              >
                <span aria-hidden="true">💬</span> Discord
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/stacks-network" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="View Stacks Clicker Source on GitHub"
                title="View Stacks Clicker Source on GitHub"
              >
                <span aria-hidden="true">🐙</span> GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
});

export default Footer;
