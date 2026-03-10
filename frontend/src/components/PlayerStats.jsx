import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';

/**
 * Animated number component for smooth counting transitions.
 */
function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 1,
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
}

/**
 * Component to display aggregate player statistics with premium animations.
 * @param {Object} props - Component props.
 * @param {Object} props.stats - Stats object { clicks, tips, votes }.
 * @param {number} props.txCount - Total transaction count.
 * @returns {JSX.Element} The rendered stats bar.
 */
export default function PlayerStats({ stats, txCount }) {
  const statItems = [
    { label: 'Clicks', value: stats.clicks, icon: '🎯', color: '#6366f1' },
    { label: 'Tips Sent', value: stats.tips, icon: '💰', color: '#10b981' },
    { label: 'Votes Cast', value: stats.votes, icon: '🗳️', color: '#f59e0b' },
    { label: 'Transactions', value: txCount, icon: '⚡', color: '#ec4899' },
  ];

  return (
    <section className="stats-bar" aria-label="Player Statistics">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          className="stat-card"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: index * 0.1
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
            borderColor: item.color + "44"
          }}
          style={{ '--accent-color': item.color }}
        >
          <div className="stat-icon" style={{ filter: `drop-shadow(0 0 8px ${item.color}44)` }}>
            {item.icon}
          </div>
          <div className="stat-content">
            <div className="value">
              <AnimatedNumber value={item.value} />
            </div>
            <div className="label">{item.label}</div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}

PlayerStats.propTypes = {
  stats: PropTypes.shape({
    clicks: PropTypes.number.isRequired,
    tips: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired
  }).isRequired,
  txCount: PropTypes.number.isRequired
};

export default memo(PlayerStats);

