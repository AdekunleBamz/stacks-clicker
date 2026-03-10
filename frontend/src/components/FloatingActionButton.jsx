import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FAB component for mobile quick actions.
 */
export default function FloatingActionButton({ onAction }) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { id: 'ping', icon: '📡', label: 'Ping All', onClick: () => onAction('ping') },
    { id: 'clear', icon: '🗑️', label: 'Clear', onClick: () => onAction('clear') },
    { id: 'top', icon: '⬆️', label: 'Top', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  ];

  return (
    <div className="fab-container">
      <AnimatePresence>
        {isOpen && (
          <div className="fab-menu">
            {actions.map((action, index) => (
              <motion.button
                key={action.id}
                className="fab-item"
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
                <span className="fab-icon">{action.icon}</span>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>
      <motion.button
        className={`fab-main ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="fab-main-icon">{isOpen ? '×' : '⚡'}</span>
      </motion.button>
    </div>
  );
}
