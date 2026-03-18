import React from 'react';

/**
 * Standard application footer.
 */
export default function Footer() {
  const version = '1.0.0'; // Could be imported from package.json if needed

  return (
    <footer className="app-footer" aria-label="Application Footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>Built with <span role="img" aria-label="love">❤️</span> on Stacks</p>
          <span className="app-version">v{version}</span>
        </div>
        <div className="footer-links">
          <a href="https://twitter.com/Stacks" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            𝕏
          </a>
          <a href="https://discord.gg/stacks" target="_blank" rel="noopener noreferrer" aria-label="Discord">
            👾
          </a>
          <a href="https://github.com/AdekunleBamz/stacks-clicker" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            🐙
          </a>
        </div>
      </div>
    </footer>
  );
}
