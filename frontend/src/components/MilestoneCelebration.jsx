import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Overlay component that showcases a celebration when a milestone is reached.
 *
 * @param {Object} props - Component props.
 * @param {string|null} props.celebration - The celebration message to display.
 */
export default function MilestoneCelebration({ celebration }) {
  return (
    <AnimatePresence>
      {celebration && (
        <motion.div
          className="milestone-celebration"
          role="status"
          aria-live="assertive"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.5 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <div className="milestone-text">{celebration}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

MilestoneCelebration.propTypes = {
  celebration: PropTypes.string
};
