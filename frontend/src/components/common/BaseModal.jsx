import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';

/**
 * Generic Modal backdrop and container.
 * Handles locking body scroll and basic animations.
 */
export default function BaseModal({ isOpen, onClose, title, children, footer, className = '' }) {
  const closeBtnRef = useRef(null);

  // Lock scroll when open
  // This is a conditional hook usage, but we can't do that.
  // We'll use the hook inside the component that is only rendered when isOpen is true.
  // Or better, we just always use it and the hook handles its own logic.
  // Actually, useLockBodyScroll as written should be used inside the modal content component.
  
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeBtnRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
}

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
        >
          ×
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

BaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  className: PropTypes.string
};
