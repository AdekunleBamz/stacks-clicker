import React, { useState, memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useKeydown } from '../hooks/useKeydown';

/**
 * FAB component for mobile quick actions.
 */
function FloatingActionButton({ onAction }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => setIsOpen(prev => !prev), []);
  
  useKeydown('x', toggleOpen);

  const actions = useMemo(() => [
    { id: 'ping', icon: '📡', label: 'Ping All', onClick: () => onAction('ping') },
    { id: 'clear', icon: '🗑️', label: 'Clear', onClick: () => onAction('clear') },
    { id: 'top', icon: '⬆️', label: 'Top', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  ], [onAction]);

  return (
    <div className="fab-container" role="application" aria-label="Mobile quick actions">
      <AnimatePresence>
        {isOpen && (
          <div className="fab-menu" role="menu">
            {actions.map((action, index) => (
              <motion.button
                type="button"
                key={action.id}
                className="fab-item secondary-button"
                role="menuitem"
                title={action.label}
                aria-label={action.label}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
              >
                <span className="fab-label">{action.label}</span>
                <span className="fab-icon" aria-hidden="true">{action.icon}</span>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        className={`fab-main primary-button ${isOpen ? 'active' : ''}`}
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={isOpen ? 'Close quick actions menu' : 'Open quick actions menu'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="fab-main-icon" aria-hidden="true">{isOpen ? '×' : '⚡'}</span>
      </motion.button>
    </div>
  );
}

FloatingActionButton.propTypes = {
  onAction: PropTypes.func.isRequired
};
FloatingActionButton.displayName = 'FloatingActionButton';

export default memo(FloatingActionButton);
