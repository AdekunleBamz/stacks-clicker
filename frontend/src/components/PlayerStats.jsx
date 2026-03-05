import React from 'react';

export default function PlayerStats({ stats, txCount }) {
  return (
    <section className="stats-bar">
      <div className="stat-card">
        <div className="value">{stats.clicks}</div>
        <div className="label">Clicks</div>
      </div>
      <div className="stat-card">
        <div className="value">{stats.tips}</div>
        <div className="label">Tips Sent</div>
      </div>
      <div className="stat-card">
        <div className="value">{stats.votes}</div>
        <div className="label">Votes Cast</div>
      </div>
      <div className="stat-card">
        <div className="value">{txCount}</div>
        <div className="label">Transactions</div>
      </div>
    </section>
  );
}
