import React from 'react';
import { usePrice } from '../hooks/usePrice';
import StatsCard from './common/StatsCard';

/**
 * Component to display aggregate player statistics with premium animations.
 * @param {Object} props - Component props.
 * @param {Object} props.stats - Stats object { clicks, tips, votes }.
 * @param {number} props.txCount - Total transaction count.
 * @returns {JSX.Element} The rendered stats bar.
 */
export default function PlayerStats({ stats, txCount }) {
  const { price } = usePrice();
  const totalInteractions = stats.clicks + stats.tips + stats.votes;
  const estStxSpent = totalInteractions * 0.0012;
  const estUsdValue = price ? (estStxSpent * price).toFixed(2) : '--';

  const statItems = [
    { label: 'Clicks', value: stats.clicks, icon: '🎯', color: '#6366f1' },
    { label: 'Tips Sent', value: stats.tips, icon: '💰', color: '#10b981' },
    { label: 'Clicks', value: stats.clicks, icon: '🎯', color: '#6366f1', ariaHiddenIcon: true },
    { label: 'Tips Sent', value: stats.tips, icon: '💰', color: '#10b981', ariaHiddenIcon: true },
    { label: 'Votes Cast', value: stats.votes, icon: '🗳️', color: '#f59e0b', ariaHiddenIcon: true },
    { label: 'Total Spent', value: estStxSpent.toFixed(4) + ' STX', icon: '📉', color: '#ec4899', ariaHiddenIcon: true },
    { label: 'Est. Value ($)', value: estUsdValue, icon: '💵', color: '#10b981', isPrice: true, ariaHiddenIcon: true },
    { label: 'Last Active', value: txCount > 0 ? 'Just now' : 'Never', icon: '⏱️', color: '#94a3b8', ariaHiddenIcon: true },
  ];

  return (
    <section className="stats-bar" aria-label="Player Statistics">
      {statItems.map((item, index) => (
        <StatsCard key={item.label} {...item} index={index} />
      ))}
    </section>
  );
}
```
