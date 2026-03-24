import React from 'react';
import PropTypes from 'prop-types';

/**
 * Toast notification component
 */
export default function Toast({ toasts = [] }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type} glass-card`} role={toast.type === 'error' ? 'alert' : 'status'} aria-live={toast.type === 'error' ? 'assertive' : 'polite'} aria-atomic="true">
          <span className="toast-icon" aria-hidden="true">
            {toast.type === 'success' && '✅'}
            {toast.type === 'error' && '❌'}
            {toast.type === 'info' && 'ℹ️'}
            {toast.type === 'warning' && '⚠️'}
          </span>
          <span className="toast-message">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

Toast.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.string,
      message: PropTypes.string,
    })
  ),
};
