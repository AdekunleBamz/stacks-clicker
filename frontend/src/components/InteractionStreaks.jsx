import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Component to track and display user interaction streaks and badges.
 */
export default function InteractionStreaks({ totalInteractions }) {
  const [streak, setStreak] = useState(0);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [badges, setBadges] = useState([]);

  // Mock streak logic based on total interactions for simplicity
  useEffect(() => {
    if (totalInteractions > 0) {
      setStreak(prev => prev + 1);
      setLastActivity(Date.now());
    }
  }, [totalInteractions]);

  useEffect(() => {
    const newBadges = [];
    if (totalInteractions >= 10) newBadges.push({ id: 'bronze', label: '🥉 Novice', color: '#cd7f32' });
    if (totalInteractions >= 50) newBadges.push({ id: 'silver', label: '🥈 Regular', color: '#c0c0c0' });
    if (totalInteractions >= 100) newBadges.push({ id: 'gold', label: '🥇 Pro', color: '#ffd700' });
    setBadges(newBadges);
  }, [totalInteractions]);

  return (
    <div className="streak-panel">
      <div className="streak-stats">
        <div className="streak-count">
          <span className="streak-fire">🔥</span>
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
              <span className="badge-text">{badge.label}</span>
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
