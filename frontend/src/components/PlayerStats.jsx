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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section
      className="stats-bar"
      aria-label="Player Statistics"
      role="region"
      tabIndex={0}
      title="Your Personal Player Statistics Overview"
    >
      <h3 id="stats-bar-title" className="sr-only">Your Player Statistics Overview</h3>
      <div className="stats-cards-wrapper">
        <motion.div 
          className="stats-cards stats-grid" 
          role="group" 
          aria-label="Aggregate Player Performance Metrics"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {statItems.map((item, index) => (
            <StatsCard key={item.label} {...item} index={index} />
          ))}
        </motion.div>
      </div>
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

