import { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

/**
 * Generic Modal backdrop and container component.
 * Handles locking body scroll, focus management, escape key handling,
 * and smooth Framer Motion animations for enter/exit transitions.
 * Uses memoization to prevent unnecessary re-renders.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is currently open
 * @param {Function} props.onClose - Callback function to close the modal
 * @param {React.ReactNode} [props.title] - Modal title displayed in header
 * @param {React.ReactNode} props.children - Content to render inside the modal body
 * @param {React.ReactNode} [props.footer] - Optional footer content
 * @param {string} [props.className=''] - Additional CSS class names
 * @returns {JSX.Element|null} The rendered modal or null if closed
 */
const BaseModal = memo(function BaseModal({ isOpen, onClose, title, children, footer, className = '' }) {
  const closeBtnRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement;
      const timer = setTimeout(() => closeBtnRef.current?.focus(), 100);

      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose?.();
      };

      window.addEventListener('keydown', handleEscape);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleEscape);
        previousFocus.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          className="modal-overlay"
          onClick={onClose}
          role="presentation"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          <ModalContent
            onClose={onClose}
            title={title}
            footer={footer}
            className={className}
            closeBtnRef={closeBtnRef}
          >
            {children}
          </ModalContent>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

function ModalContent({ onClose, title, children, footer, className, closeBtnRef }) {
  useLockBodyScroll();

  return (
    <motion.div
      className={`modal-content ${className}`}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-body-desc"
    >
      <div className="modal-header">
        <h3 id="modal-title">{title}</h3>
        <button
          type="button"
          className="close-btn secondary-button btn-sm"
          onClick={onClose}
          ref={closeBtnRef}
          aria-label="Close modal"
          title="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body" id="modal-body-desc">
        {children}
      </div>
      {footer && (
        <div className="modal-footer">
          {footer}
        </div>
      )}
    </motion.div>
  );
}

BaseModal.defaultProps = {
  onClose: undefined,
  title: '',
  footer: null,
  className: '',
};

BaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  className: PropTypes.string
};

export default BaseModal;
