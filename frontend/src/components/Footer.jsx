import React from 'react';
import packageJson from '../../package.json';

/**
 * Standard application footer.
 */
export default function Footer() {
  const version = packageJson.version;

  return (
    <footer className="app-footer" role="contentinfo" aria-label="Global Application Footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>Built with <span role="img" aria-label="love">❤️</span> on Stacks</p>
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
}
