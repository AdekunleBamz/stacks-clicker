import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      className={`action-btn ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={{ scale: 1.02, translateY: -2 }}
      whileTap={{ scale: 0.98, translateY: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="btn-content">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="loading-progress-container" key="loader">
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
