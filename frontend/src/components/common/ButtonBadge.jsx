import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Animated badge for buttons/icons to indicate notifications or updates.
 * Can display a number or just a solid dot indicator.
 */
const ButtonBadge = ({ count, showDotOnly = false, maxCount = 99, color = 'var(--error)' }) => {
  const isVisible = count > 0 || showDotOnly;
  
  const displayCount = count > maxCount ? `${maxCount}+` : count;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          className={`button-badge ${showDotOnly ? 'dot-only' : 'with-count'}`}
          style={{ backgroundColor: color }}
          aria-label={showDotOnly ? "New notification" : `${count} new notifications`}
        >
          {!showDotOnly && <span className="badge-text">{displayCount}</span>}
        </motion.div>
      )}
      
      <style jsx>{`
        .button-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          border: 2px solid var(--bg-card);
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 10;
        }

        .dot-only {
          width: 10px;
          height: 10px;
        }

        .with-count {
          min-width: 18px;
          height: 18px;
          padding: 0 4px;
        }

        .badge-text {
          font-size: 0.65rem;
          font-weight: 800;
          line-height: 1;
        }
      `}</style>
    </AnimatePresence>
  );
};

ButtonBadge.propTypes = {
  count: PropTypes.number,
  showDotOnly: PropTypes.bool,
  maxCount: PropTypes.number,
  color: PropTypes.string
};

export default ButtonBadge;
