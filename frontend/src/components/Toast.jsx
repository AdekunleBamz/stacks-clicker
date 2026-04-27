import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Toast notification component with smooth framer-motion animations.
 * Displays a list of toast notifications with appropriate icons and ARIA roles.
 *
 * @param {Object} props - Component props
 * @param {Array} [props.toasts=[]] - Array of toast notification objects
 * @returns {JSX.Element} The rendered toast container
 */
export default function Toast({ toasts = [] }) {
  return (
    <div className="toast-container" role="status" aria-live="polite" aria-atomic="true">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`toast toast-${toast.type}`}
            role="alert"
            aria-label={`${toast.type || 'info'} notification`}
            title={toast.message || 'Notification'}
          >
            <span className="toast-icon" aria-hidden="true">
              {toast.type === 'success' && '✅'}
              {toast.type === 'error' && '❌'}
              {toast.type === 'info' && 'ℹ️'}
              {toast.type === 'warning' && '⚠️'}
            </span>
            <span className="toast-message">{toast.message || 'Notification'}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

Toast.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
      message: PropTypes.string,
    })
  ),
};

export default memo(Toast);
