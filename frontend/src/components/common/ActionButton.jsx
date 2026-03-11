import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Reusable action button component with motion effects, loading states, and error animations.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.label - Text label to display on the button
 * @param {React.ReactNode} [props.icon] - Icon element or emoji to display next to the label
 * @param {Function} props.onClick - Handler function for button click events
 * @param {boolean} [props.isLoading=false] - Whether the button is in a loading/processing state
 * @param {boolean} [props.disabled=false] - Whether the button is interactively disabled
 * @param {string} [props.className=''] - Additional CSS classes for styling
 * @param {string} [props.cost] - Optional cost string (e.g., "0.001 STX") to display below the label
 * @param {boolean} [props.isError=false] - Triggers a shake animation if true to indicate validation error
 * @returns {JSX.Element} The rendered action button
 */
function ActionButton({
  label,
  icon,
  onClick,
  isLoading = false,
  disabled = false,
  className = '',
  cost,
  isError = false
}) {
  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.button
      className={`action-btn ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={!disabled && !isLoading ? { scale: 1.05, translateY: -4 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.95, translateY: 0 } : {}}
      animate={isError ? "shake" : ""}
      variants={shakeVariants}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="btn-content">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="loading-progress-container" key="loader">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "linear" }}
                className="loading-progress-bar"
              />
            </div>
          ) : (
            <motion.span
              key="icon"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              {icon}
            </motion.span>
          )}
        </AnimatePresence>
        <span>{label}</span>
      </div>
      {cost && <span className="btn-cost">{cost}</span>}
    </motion.button>
  );
}

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  cost: PropTypes.string,
  isError: PropTypes.bool
};

export default memo(ActionButton);
