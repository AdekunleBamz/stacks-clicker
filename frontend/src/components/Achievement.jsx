import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Achievement Component - Displays individual player milestones.
 * Shows locked/unlocked state with smooth animations and visual feedback.
 * Uses memoization to prevent unnecessary re-renders.
 *
 * @param {Object} props - Component props
 * @param {Object} props.achievement - Achievement data object
 * @param {string} props.achievement.icon - Icon or emoji representing the achievement
 * @param {string} props.achievement.title - Achievement title
 * @param {string} props.achievement.description - Achievement description
 * @param {boolean} props.achievement.unlocked - Whether the achievement is unlocked
 * @param {string} [props.achievement.date] - Date when achievement was unlocked
 * @returns {JSX.Element} The rendered achievement card
 */
const Achievement = memo(function Achievement({ achievement }) {
    const { icon, title, description, unlocked, date } = achievement;

    return (
        <motion.div
            className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={unlocked ? { y: -5, boxShadow: '0 0 20px hsla(var(--pulse-purple) / 0.2)' } : {}}
        >
            <div className="achievement-icon-wrapper">
                <span className="achievement-icon">{icon}</span>
                {!unlocked && <div className="achievement-lock">🔒</div>}
            </div>

            <div className="achievement-info">
                <h3>{title}</h3>
                <p>{description}</p>
                {unlocked && date && <span className="achievement-date">Unlocked on {date}</span>}
            </div>

            {unlocked && (
                <motion.div
                    className="achievement-glow"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            )}
        </motion.div>
    );
});

Achievement.propTypes = {
    achievement: PropTypes.shape({
        icon: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        unlocked: PropTypes.bool.isRequired,
        date: PropTypes.string
    }).isRequired
};

export default Achievement;

export default Achievement;
