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
        <div className="error-boundary-container" role="alert" aria-live="assertive">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h2 className="error-title">Something went wrong</h2>
            <p className="error-message">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <div className="error-actions">
              <button
                type="button"
                className="error-btn retry"
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                🔄 Try Again
              </button>
              <button
                type="button"
                className="error-btn reload"
                onClick={() => window.location.reload()}
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
