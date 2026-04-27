import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Achievement Component
 * Displays individual player milestones
 */

function Achievement({ achievement }) {
    const { icon, title, description, unlocked, date } = achievement;

    return (
        <motion.div
            className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`}
            aria-label={`${title} achievement, ${unlocked ? 'unlocked' : 'locked'}`}
            role="listitem"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={unlocked ? { y: -5, boxShadow: '0 0 20px hsla(var(--pulse-purple) / 0.2)' } : {}}
        >
            <div className="achievement-icon-wrapper">
                <span className="achievement-icon" aria-hidden="true">{icon}</span>
                {!unlocked && <div className="achievement-lock" aria-hidden="true">🔒</div>}
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
}

Achievement.propTypes = {
    achievement: PropTypes.shape({
        icon: PropTypes.string,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        unlocked: PropTypes.bool,
        date: PropTypes.string,
    }).isRequired,
};

export default memo(Achievement);
