import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Animated badge for buttons/icons to indicate notifications or updates.
 * Can display a number or just a solid dot indicator.
 * Uses memoization to prevent unnecessary re-renders during badge animations.
 *
 * @param {Object} props - Component props
 * @param {number} [props.count] - Number to display in the badge
 * @param {boolean} [props.showDotOnly=false] - If true, shows only a dot instead of count
 * @param {number} [props.maxCount=99] - Maximum count before showing "maxCount+" format
 * @param {string} [props.color='var(--error)'] - Badge background color
 * @returns {JSX.Element|null} The rendered badge or null if not visible
 */
const ButtonBadge = memo(function ButtonBadge({ count, showDotOnly = false, maxCount = 99, color = 'var(--error)' }) {
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
          aria-label={showDotOnly ? 'New notification' : `${count} new notifications`}
          role="status"
        >
          {!showDotOnly && <span className="badge-text" aria-hidden="true">{displayCount}</span>}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

ButtonBadge.propTypes = {
  count: PropTypes.number,
  showDotOnly: PropTypes.bool,
  maxCount: PropTypes.number,
  color: PropTypes.string
};

export default ButtonBadge;
