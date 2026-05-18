import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const itemInitial = { opacity: 0, scale: 0.95, y: -10 };
const itemAnimate = { opacity: 1, scale: 1, y: 0 };
const itemExit = { opacity: 0, x: 20 };

const ACTIVITY_ICONS = {
  click: '👆',
  tip: '💰',
  poll: '🗳️',
  streak: '🔥',
};

/**
 * SocialFeed Component
 * Real-time community activity stream
 */
function SocialFeed({ activities }) {
  return (
    <div className="game-card social-feed" title="Live community activity feed">
      <div className="game-header">
        <h2>
          <span aria-hidden="true">🔥</span> Live Activity
        </h2>
        <span className="game-badge">Community</span>
      </div>

      <div
        className="activity-list"
        role="feed"
        aria-live="polite"
        aria-atomic="false"
        aria-relevant="additions removals"
        aria-label="Community live activity"
      >
        {activities.length === 0 && (
          <p className="feed-empty" role="article">
            No recent activity. Start interacting!
          </p>
        )}
        <AnimatePresence initial={false}>
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={itemInitial}
              animate={itemAnimate}
              exit={itemExit}
              className="activity-item"
              role="article"
            >
              <span className="activity-icon" aria-hidden="true">
                {ACTIVITY_ICONS[activity.type] ?? ''}
              </span>
              <div className="activity-content">
                <span className="activity-user">{activity.user}</span>
                <span className="activity-text">{activity.text}</span>
              </div>
              <span className="activity-time" title={`Activity time: ${activity.time}`}>
                {activity.time}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

SocialFeed.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.string,
      user: PropTypes.string,
      text: PropTypes.string,
      time: PropTypes.string,
    })
  ),
};

SocialFeed.defaultProps = {
  activities: [],
};

export default memo(SocialFeed);
