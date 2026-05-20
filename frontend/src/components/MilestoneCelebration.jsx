import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const celebInitial = { opacity: 0, scale: 0.5 };
const celebAnimate = { opacity: 1, scale: 1 };
const celebExit = { opacity: 0, scale: 1.5 };
const celebTransition = { type: 'spring', stiffness: 200, damping: 25 };

/**
 * Overlay component that showcases a celebration when a milestone is reached.
 *
 * @param {Object} props - Component props.
 * @param {string|null} props.celebration - The celebration message to display.
 */
function MilestoneCelebration({ celebration = null }) {
  return (
    <AnimatePresence>
      {celebration && (
        <motion.div
          className="milestone-celebration"
          role="alert"
          aria-label={`Milestone reached: ${celebration}`}
          aria-atomic="true"
          aria-relevant="additions text"
          initial={celebInitial}
          animate={celebAnimate}
          exit={celebExit}
          transition={celebTransition}
        >
          <div className="milestone-text">{celebration}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

MilestoneCelebration.propTypes = {
  celebration: PropTypes.string,
};

export default memo(MilestoneCelebration);
