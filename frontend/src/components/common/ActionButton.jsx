import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const shakeVariants = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  }
};

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

  return (
    <motion.button
      type="button"
      className={`action-btn ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={cost ? `${label} - Cost: ${cost}` : label}
      aria-busy={isLoading}
      aria-live="assertive"
      title={label}
      tabIndex={0}
      whileHover={!disabled && !isLoading ? {
        scale: 1.02,
        translateY: -2,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      } : {}}
      whileTap={!disabled && !isLoading ? {
        scale: 0.98,
        translateY: 0,
        filter: "brightness(0.9)"
      } : {}}
      animate={isError ? "shake" : {}}
      variants={shakeVariants}
      transition={{ type: "spring", stiffness: 500, damping: 15 }}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Micro-shimmer effect on hover */}
      {!disabled && !isLoading && (
        <motion.div
          className="btn-shimmer"
          initial={{ x: '-100%', skewX: -20 }}
          whileHover={{ x: '200%' }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
      )}
      <div className="btn-content" style={{ zIndex: 2, position: 'relative' }}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div
              className="loading-progress-container"
              key="loader"
              role="progressbar"
              aria-label={`${label} in progress`}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%", opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, ease: "linear", opacity: { duration: 1, repeat: Infinity } }}
                className="loading-progress-bar pulse"
              />
            </div>
          ) : (
            <motion.span
              key="icon"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <span aria-hidden="true">{icon}</span>
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
