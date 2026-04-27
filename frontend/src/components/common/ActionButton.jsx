import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Reusable action button component with motion effects.
 */
export default function ActionButton({
  label,
  icon,
  onClick,
  isLoading,
  disabled,
  className = '',
  cost
}) {
  return (
    <motion.button
      type="button"
      className={`action-btn ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={label}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      whileHover={disabled || isLoading ? undefined : { scale: 1.02, translateY: -2 }}
      whileTap={disabled || isLoading ? undefined : { scale: 0.98, translateY: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="btn-content">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="spinner"
            />
          ) : (
            <motion.span
              key="icon"
              aria-hidden="true"
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
      {cost && <span className="btn-cost" aria-hidden="true">{cost}</span>}
    </motion.button>
  );
}

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  cost: PropTypes.string,
};
