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
    <footer className="app-footer" role="contentinfo" aria-label="Global Application Footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>Built with <span role="img" aria-label="developer love and care">❤️</span> on Stacks</p>
          <span className="app-version" title="Current Interface Version">v{version}</span>
        </div>
        <div className="footer-links">
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
      </div>
      </div>
    </footer>
  );
});

export default Footer;
