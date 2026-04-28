import { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { animate } from 'framer-motion';
import StatsCard from './common/StatsCard';

/**
 * Animated number component for smooth counting transitions.
 */
function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    const controls = animate(fromRef.current, value, {
      duration: 1,
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });
    fromRef.current = value;
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
function PlayerStats({ stats, txCount }) {
  const statItems = [
    { label: 'Clicks', value: stats.clicks, icon: '🎯', color: '#6366f1' },
    { label: 'Tips Sent', value: stats.tips, icon: '💰', color: '#10b981' },
    { label: 'Votes Cast', value: stats.votes, icon: '🗳️', color: '#f59e0b' },
    { label: 'Transactions', value: txCount, icon: '⚡', color: '#ec4899' },
  ];

  return (
    <section
      className="stats-bar"
      aria-label="Player Statistics"
      role="region"
      title="Your Personal Player Statistics Overview"
      style={{ textRendering: 'optimizeLegibility' }}
    >
      <div className={`stats-cards ${txCount === 0 && stats.clicks === 0 ? 'shimmer' : ''}`} role="group" aria-label="Aggregate Player Performance Metrics">
        {statItems.map((item, index) => (
          <StatsCard key={item.label} {...item} index={index} />
        ))}
      </div>
    </section>
  );
}

PlayerStats.propTypes = {
  stats: PropTypes.shape({
    clicks: PropTypes.number,
    tips: PropTypes.number,
    votes: PropTypes.number,
  }),
  txCount: PropTypes.number,
};

PlayerStats.defaultProps = {
  stats: { clicks: 0, tips: 0, votes: 0 },
  txCount: 0,
};

export default memo(PlayerStats);
