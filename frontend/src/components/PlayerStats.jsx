import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import StatsCard from './common/StatsCard';
import { usePrevious } from '../hooks/usePrevious';

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
  const prevStats = usePrevious(stats) || { clicks: 0, tips: 0, votes: 0 };
  const prevTxCount = usePrevious(txCount) || 0;

  const statItems = useMemo(() => [
    { label: 'Total Clicks', value: stats.clicks, isGrowing: stats.clicks > prevStats.clicks, icon: '🎯', color: 'indigo', tooltip: 'Total number of on-chain click operations.' },
    { label: 'Total Tips', value: stats.tips, isGrowing: stats.tips > prevStats.tips, icon: '💰', color: 'amber', tooltip: 'Total STX tokens tipped.' },
    { label: 'Total Votes', value: stats.votes, isGrowing: stats.votes > prevStats.votes, icon: '🗳️', color: 'emerald', tooltip: 'Unique poll votes.' },
    { label: 'Session TXs', value: txCount, isGrowing: txCount > prevTxCount, icon: '📦', color: 'pink', tooltip: 'Transactions in this session.' }
  ], [stats, txCount, prevStats, prevTxCount]);

  return (
    <section
      className="stats-bar"
      aria-labelledby="stats-bar-title"
      role="region"
    >
      <h3 id="stats-bar-title" className="sr-only">Your Player Statistics Overview</h3>
      <div className="stats-cards" role="group" aria-label="Aggregate Player Performance Metrics">
        {statItems.map((item, index) => (
          <StatsCard key={item.label} {...item} index={index} />
        ))}
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

PlayerStats.displayName = 'PlayerStats';

export default memo(PlayerStats);
