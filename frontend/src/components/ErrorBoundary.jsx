import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container" role="alertdialog" aria-live="assertive">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h2 id="error-boundary-title" className="error-title" aria-label="Application Error Encountered" style={{ color: 'var(--error)' }}>Something went wrong</h2>
            <p className="error-message" aria-describedby="error-boundary-title">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <div className="error-actions">
              <button
                type="button"
                className="action-btn primary"
                onClick={() => this.setState({ hasError: false })}
              >
                <span aria-hidden="true">🔄</span> Try Again
              </button>
              <button
                className="action-btn secondary"
                onClick={() => window.location.reload()}
                title="Reload the application completely"
              >
                🌐 Reload App
              </button>
            </div>
            <p className="error-helper">
              If the problem persists, please contact support or check the network status.
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
