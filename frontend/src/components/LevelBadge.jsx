import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const badgeInitial = { scale: 0.8, opacity: 0 };
const badgeAnimate = { scale: 1, opacity: 1 };
const badgeTransition = { type: 'spring', damping: 12, stiffness: 200 };
const particleAnimate = { rotate: 360 };
const PARTICLE_COLORS = [
  'hsl(var(--pulse-cyan))',
  'hsl(var(--pulse-purple))',
  'hsl(var(--pulse-purple))',
];
const PARTICLE_COUNT = 3;

/**
 * LevelBadge Component
 * Displays the current level with a premium, animated badge
 *
 * @param {{ level: number }} props - Badge display props.
 * @returns {JSX.Element} The rendered level badge.
 */
function LevelBadge({ level = 1 }) {
  return (
    <motion.div
      className="level-badge-container"
      role="img"
      aria-label={`Level ${level} badge`}
      aria-roledescription="level badge"
      title={`Level ${level} badge`}
      initial={badgeInitial}
      animate={badgeAnimate}
      transition={badgeTransition}
    >
      <div className="level-badge-glow"></div>
      <div className="level-badge-inner">
        <span className="level-text" aria-hidden="true">
          LVL
        </span>
        <span className="level-number" aria-live="polite" aria-atomic="true">
          {level}
        </span>
      </div>

      {/* Mini orbiting particles */}
      {Array.from({ length: PARTICLE_COUNT }, (_, i) => (
        <motion.div
          key={i}
          className="level-particle"
          aria-hidden="true"
          animate={particleAnimate}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: PARTICLE_COLORS[i],
            top: '50%',
            left: '50%',
            marginLeft: '-2px',
            marginTop: '-2px',
            transformOrigin: `${25 + i * 5}px center`,
            willChange: 'transform',
          }}
        />
      ))}
    </motion.div>
  );
}

LevelBadge.propTypes = {
  level: PropTypes.number,
};

export default memo(LevelBadge);
