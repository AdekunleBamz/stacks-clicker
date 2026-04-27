import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * XP Progress bar component for displaying player experience points.
 */
function XPProgress({ currentXP, nextLevelXP, level }) {
  const safeCurrentXP = Math.max(0, Number.isFinite(currentXP) ? currentXP : 0);
  const safeNextLevelXP = nextLevelXP > 0 ? nextLevelXP : 100;
  const percentage = Math.min(100, Math.floor((safeCurrentXP / safeNextLevelXP) * 100));

  return (
    <div className="xp-progress" aria-label={`Level ${level} XP progress: ${safeCurrentXP} of ${safeNextLevelXP}`}>
      <div className="xp-labels">
        <span className="xp-current">{safeCurrentXP.toLocaleString()} XP</span>
        <span className="xp-next">{safeNextLevelXP.toLocaleString()} XP</span>
      </div>
      <div
        className="xp-bar-track"
        role="progressbar"
        aria-valuenow={safeCurrentXP}
        aria-valuemin={0}
        aria-valuemax={safeNextLevelXP}
        aria-label={`${percentage}% to next level`}
      >
        <motion.div
          className="xp-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <span className="xp-percentage" aria-hidden="true">{percentage}%</span>
    </div>
  );
}

XPProgress.propTypes = {
  currentXP: PropTypes.number.isRequired,
  nextLevelXP: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
};

XPProgress.defaultProps = {
  currentXP: 0,
  nextLevelXP: 100,
  level: 1,
};

export default memo(XPProgress);
