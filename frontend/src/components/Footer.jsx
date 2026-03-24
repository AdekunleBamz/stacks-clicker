import React, { memo } from 'react';
import packageJson from '../../package.json';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/**
 * Standard application footer.
 */
function Footer() {
  const version = packageJson.version;
  const currentYear = new Date().getFullYear();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });

  return (
    <footer 
      ref={ref}
      className={`app-footer ${isVisible ? 'footer-visible' : ''}`} 
      role="contentinfo" 
      aria-label="Global Application Footer"
    >
      <div className="footer-content">
        <div className="footer-left">
          <p>© {currentYear} • Built with <span role="img" aria-label="love">❤️</span> on Stacks</p>
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

Footer.displayName = 'Footer';

export default memo(Footer);
