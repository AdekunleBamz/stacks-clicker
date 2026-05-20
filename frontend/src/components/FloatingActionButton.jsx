import { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const itemInitial = { opacity: 0, scale: 0, y: 20 };
const itemAnimate = { opacity: 1, scale: 1, y: 0 };
const itemExit = { opacity: 0, scale: 0, y: 20 };
const mainHover = { scale: 1.1 };
const mainTap = { scale: 0.9 };

/**
 * FAB component for mobile quick actions.
 */
export default function FloatingActionButton({ onAction = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const actions = useMemo(
    () => [
      { id: 'ping', icon: '📡', label: 'Ping All', onClick: () => onAction('ping') },
      { id: 'clear', icon: '🗑️', label: 'Clear', onClick: () => onAction('clear') },
      {
        id: 'top',
        icon: '⬆️',
        label: 'Top',
        onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      },
    ],
    [onAction]
  );

  return (
    <div
      className="fab-container"
      title="Floating quick actions"
      role="complementary"
      aria-label="Floating quick action controls"
    >
      <AnimatePresence>
        {isOpen && (
          <div
            className="fab-menu"
            id="fab-menu"
            role="menu"
            aria-label="Quick actions menu"
            title="Quick actions"
          >
            {actions.map((action, index) => (
              <motion.button
                type="button"
                key={action.id}
                className="fab-item"
                aria-label={action.label}
                title={action.label}
                role="menuitem"
                initial={itemInitial}
                animate={itemAnimate}
                exit={itemExit}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
              >
                <span className="fab-label">{action.label}</span>
                <span className="fab-icon" aria-hidden="true">
                  {action.icon}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        className={`fab-main ${isOpen ? 'active' : ''}`}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls="fab-menu"
        aria-label={isOpen ? 'Close quick actions menu' : 'Open quick actions menu'}
        title={isOpen ? 'Close quick actions' : 'Open quick actions'}
        whileHover={mainHover}
        whileTap={mainTap}
      >
        <span className="fab-main-icon" aria-hidden="true">
          {isOpen ? '×' : '⚡'}
        </span>
      </motion.button>
    </div>
  );
}

FloatingActionButton.propTypes = {
  onAction: PropTypes.func,
};
