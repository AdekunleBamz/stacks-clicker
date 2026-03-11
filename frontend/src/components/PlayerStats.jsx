import React, { memo } from 'react';
import PropTypes from 'prop-types';
import StatCard from './common/StatCard';

/**
 * Component to display player statistics and achievement progress.
 * @param {Object} props - Component props.
 * @param {Object} props.stats - Object containing click, tip, and vote counts.
 * @param {number} props.txCount - Current transaction count.
 */
function PlayerStats({ stats, txCount }) {
  return (
    <section className="stats-bar" aria-label="Player Statistics">
      {statItems.map((item, index) => (
        <StatsCard key={item.label} {...item} index={index} />
      ))}
    </section>
  );
}

