import React from 'react';

/**
 * Standard application footer.
 */
export default function Footer() {
  const version = '1.0.0';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer" role="contentinfo" aria-label="Global Application Footer">
      <div className="footer-content">
        <section className="footer-left" aria-label="Copyright and version">
          <small>
            &copy; {currentYear} Stacks Clicker • Built with{' '}
            <span role="img" aria-label="love">
              ❤️
            </span>{' '}
            on Stacks
          </small>
          <span className="app-version" title="Current Interface Version">
            v{version}
          </span>
        </section>

        <nav className="footer-links" aria-label="Community links">
          <ul className="social-links-list">
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
}
