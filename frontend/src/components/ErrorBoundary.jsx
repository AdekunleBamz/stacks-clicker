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
        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            background: 'rgba(255, 71, 87, 0.05)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 71, 87, 0.2)',
            margin: '20px',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <img
            src="/error_illustration.png"
            alt="Error Robot"
            style={{ width: '200px', height: 'auto', marginBottom: '20px' }}
          />
          <h2 style={{ color: '#ff4757', marginBottom: '10px' }}>⚠️ Something went wrong</h2>
          <p style={{ color: '#a0a0a0', marginBottom: '20px' }}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #9d4edd, #ff007f)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            🔄 Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
