import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import StatsCard from './common/StatsCard';

/**
 * Component to display player statistics and achievement progress.
 * Orchestrates a row of StatsCard components representing clicks, tips, and votes.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.stats - Object containing interaction counts { clicks, tips, votes }
 * @param {number} props.txCount - Current transaction/session activity count
 * @returns {JSX.Element} The rendered statistics bar
 */
function PlayerStats({ stats, txCount }) {
  const statItems = useMemo(() => [
    { label: 'Total Clicks', value: stats.clicks, icon: '🎯', color: 'indigo' },
    { label: 'Total Tips', value: stats.tips, icon: '💰', color: 'amber' },
    { label: 'Total Votes', value: stats.votes, icon: '🗳️', color: 'emerald' },
    { label: 'Session TXs', value: txCount, icon: '📦', color: 'pink' }
  ], [stats, txCount]);

  return (
    <section className="stats-bar" aria-label="Player Statistics">
      {statItems.map((item, index) => (
        <StatsCard key={item.label} {...item} index={index} />
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

