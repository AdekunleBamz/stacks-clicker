import React from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorBoundary component - Catches JavaScript errors anywhere in the component tree.
 * Displays a fallback UI with recovery options when an error occurs.
 *
 * @class
 * @extends React.Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 */
class ErrorBoundary extends React.Component {
  /**
   * Creates an ErrorBoundary instance.
   * @param {Object} props - Component props
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Updates state when an error is thrown by a descendant component.
   * @param {Error} error - The error that was thrown
   * @returns {Object} Updated state object
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Logs error information to console for debugging.
   * @param {Error} error - The error that was caught
   * @param {Object} errorInfo - Object containing the component stack trace
   */
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.children !== this.props.children) {
      this.setState({ hasError: false, error: null });
    }
  }

  /**
   * Renders the error boundary UI or children.
   * @returns {React.ReactNode} The rendered content
   */
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container" role="alertdialog" aria-live="assertive" aria-labelledby="error-boundary-title">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h2 id="error-boundary-title" className="error-title" aria-label="Application Error Encountered" style={{ color: 'var(--error)' }}>Something went wrong</h2>
            <p className="error-message" aria-describedby="error-boundary-title">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <div className="error-actions" role="group" aria-label="Error Recovery Actions">
              <button
                type="button"
                className="action-btn primary"
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                <span aria-hidden="true">🔄</span> Try Again
              </button>
              <button
                type="button"
                className="action-btn secondary"
                onClick={() => window.location.reload()}
                title="Reload the application completely"
                aria-label="Reload the application"
              >
                🌐 Reload App
              </button>
            </div>
            <p className="error-helper">
              If the problem persists, try refreshing the page or check your network connection.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
