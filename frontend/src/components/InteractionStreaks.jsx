import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Component to track and display user interaction streaks and achievement badges.
 * Provides visual feedback on user engagement levels through animated fire icons and tiered badges.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.totalInteractions - The total count of verified on-chain interactions
 * @returns {JSX.Element} The rendered interaction streaks and badges panel
 */
function InteractionStreaks({ totalInteractions }) {
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);

  /**
   * Internal effect to increment streak based on interaction activity.
   * In a production environment, this would ideally be calculated from timestamped transaction logs.
   */
  useEffect(() => {
    if (totalInteractions > 0) {
      setStreak(prev => prev + 1);
    }
  }, [totalInteractions]);

  /**
   * Effect to calculate and update earned badges based on total interaction milestones.
   */
  useEffect(() => {
    const newBadges = [];
    if (totalInteractions >= 10) newBadges.push({ id: 'bronze', label: '🥉 Novice', color: '#cd7f32' });
    if (totalInteractions >= 50) newBadges.push({ id: 'silver', label: '🥈 Regular', color: '#c0c0c0' });
    if (totalInteractions >= 100) newBadges.push({ id: 'gold', label: '🥇 Pro', color: '#ffd700' });
    setBadges(newBadges);
  }, [totalInteractions]);

  return (
    <div className="streak-panel" role="status" aria-live="polite" aria-atomic="true">
      <div className="streak-stats">
        <div className="streak-count">
          <motion.span
            className="streak-fire"
            style={{ willChange: 'transform, filter' }}
            animate={{ scale: [1, 1.2, 1], filter: ["drop-shadow(0 0 0px #ff4500)", "drop-shadow(0 0 10px #ff4500)", "drop-shadow(0 0 0px #ff4500)"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            role="img"
            aria-label="Streak Fire"
          >
            🔥
          </motion.span>
          <span className="streak-value">{streak}</span>
          <span className="streak-label">Streak</span>
        </div>
      </div>
      <div className="badges-grid">
        <AnimatePresence>
          {badges.map(badge => (
            <motion.div
              key={badge.id}
              className="badge-item"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ y: -5 }}
              style={{ borderColor: badge.color }}
            >
              <span className="badge-text" title={`Achievement Badge: ${badge.label}`}>{badge.label}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

InteractionStreaks.propTypes = {
  totalInteractions: PropTypes.number.isRequired
};

export default memo(InteractionStreaks);
