import { useEffect, useCallback, memo, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Base Modal component for shared UI interactions.
 * Provides a reusable dialog with smooth Framer Motion animations,
 * escape key handling, and proper ARIA accessibility attributes.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is currently open
 * @param {Function} props.onClose - Callback function to close the modal
 * @param {string} props.title - Modal title displayed in the header
 * @param {React.ReactNode} props.children - Content to render inside the modal body
 * @param {string} [props.maxWidth='500px'] - Maximum width of the modal content
 * @returns {JSX.Element} The rendered modal dialog
 */
const Modal = memo(function Modal({ isOpen, onClose, title, children, maxWidth = '500px' }) {
  const modalTitleId = useId();
  const modalBodyId = useId();
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose} role="presentation">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="modal-content"
            style={{ maxWidth }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            aria-describedby={modalBodyId}
          >
            <button
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
              title="Close"
              type="button"
            >
              <span aria-hidden="true">✕</span>
            </button>
            <div className="modal-header">
              <h2 id={modalTitleId} className="modal-title">
                {title}
              </h2>
            </div>
            <div className="modal-body" id={modalBodyId}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

Modal.defaultProps = {
  maxWidth: '500px',
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
};

export default Modal;
