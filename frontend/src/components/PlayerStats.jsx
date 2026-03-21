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
    { label: 'Total Clicks', value: stats.clicks, icon: '🎯', color: 'indigo', tooltip: 'Total number of on-chain click operations performed by your address.' },
    { label: 'Total Tips', value: stats.tips, icon: '💰', color: 'amber', tooltip: 'Total amount of STX tokens you have tipped to the community.' },
    { label: 'Total Votes', value: stats.votes, icon: '🗳️', color: 'emerald', tooltip: 'Number of unique votes you have cast in community polls.' },
    { label: 'Session TXs', value: txCount, icon: '📦', color: 'pink', tooltip: 'Total number of transactions initiated in this browsing session.' }
  ], [stats, txCount]);

  return (
    <section
      className="stats-bar"
      aria-label="Player Statistics"
      role="region"
      tabIndex={0}
      title="Your Personal Player Statistics Overview"
    >
      <div className="stats-cards" role="group" aria-label="Player Performance Metrics">
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

export default memo(PlayerStats);

