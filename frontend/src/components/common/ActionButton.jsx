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
  cost,
  isError = false
}) {
  return (
    <motion.button
      type="button"
      className={`action-btn ${className}${isError ? ' btn-error' : ''}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={label}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      whileHover={disabled || isLoading ? undefined : { scale: 1.02, translateY: -2 }}
      whileTap={disabled || isLoading ? undefined : { scale: 0.98, translateY: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
  isError: PropTypes.bool,
};
