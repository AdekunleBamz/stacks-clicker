import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * SocialFeed Component
 * Real-time community activity stream
 */
function SocialFeed({ activities }) {
    return (
        <div className="game-card social-feed">
            <div className="game-header">
            <h2><span aria-hidden="true">🔥</span> Live Activity</h2>
                <span className="game-badge">Community</span>
            </div>

            <div className="activity-list" role="feed" aria-label="Community live activity">
                <AnimatePresence initial={false}>
                    {activities.map((activity) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="activity-item"
                            role="article"
                            aria-label={`${activity.user}: ${activity.text}`}
                        >
                            <span className="activity-icon" aria-hidden="true">
                                {activity.type === 'click' && '👆'}
                                {activity.type === 'tip' && '💰'}
                                {activity.type === 'poll' && '🗳️'}
                                {activity.type === 'streak' && '🔥'}
                            </span>
                            <div className="activity-content">
                                <span className="activity-user">{activity.user}</span>
                                <span className="activity-text">{activity.text}</span>
                            </div>
                            <span className="activity-time" aria-label={`Posted ${activity.time} ago`}>{activity.time}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

SocialFeed.propTypes = {
    activities: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        type: PropTypes.string,
        user: PropTypes.string,
        text: PropTypes.string,
        time: PropTypes.string,
    })).isRequired,
};

export default memo(SocialFeed);
