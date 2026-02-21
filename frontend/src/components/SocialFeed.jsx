import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SocialFeed Component
 * Real-time community activity stream
 */
export default function SocialFeed({ activities }) {
    return (
        <div className="game-card social-feed">
            <div className="game-header">
                <h2>🔥 Live Activity</h2>
                <span className="game-badge">Community</span>
            </div>

            <div className="activity-list">
                <AnimatePresence initial={false}>
                    {activities.map((activity) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="activity-item"
                        >
                            <span className="activity-icon">
                                {activity.type === 'click' && '👆'}
                                {activity.type === 'tip' && '💰'}
                                {activity.type === 'poll' && '🗳️'}
                                {activity.type === 'streak' && '🔥'}
                            </span>
                            <div className="activity-content">
                                <span className="activity-user">{activity.user}</span>
                                <span className="activity-text">{activity.text}</span>
                            </div>
                            <span className="activity-time">{activity.time}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
