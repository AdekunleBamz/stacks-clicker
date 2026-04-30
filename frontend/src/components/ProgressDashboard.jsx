import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import XPProgress from './XPProgress';
import LevelBadge from './LevelBadge';
import StatsGrid from './StatsGrid';
import Achievement from './Achievement';

/**
 * ProgressDashboard Component
 * Aggregate view for player progression
 */
function ProgressDashboard({ userData }) {
    const { level, xp, nextLevelXP, stats, achievements } = userData;

    return (
        <section className="progress-dashboard" aria-labelledby="progress-dashboard-title">
            <div className="dashboard-section-header">
                <h2 id="progress-dashboard-title"><span aria-hidden="true">🏆</span> Progress Dashboard</h2>
                <p>Your journey in the Stacks Ecosystem</p>
            </div>

            <div className="dashboard-main-row">
                <LevelBadge level={level} />
                <div style={{ flex: 1 }}>
                    <XPProgress currentXP={xp} nextLevelXP={nextLevelXP} level={level} />
                </div>
            </div>

            <StatsGrid stats={stats} />

            <div className="achievements-section" style={{ marginTop: '3rem' }} title="Milestone achievements">
                <h3 id="milestones-title" style={{ marginBottom: '1.5rem', fontWeight: 800 }}>Milestones</h3>
                <div className="achievements-list" role="list" aria-labelledby="milestones-title">
                    {(achievements ?? []).map((ach) => (
                        <Achievement key={ach.id || ach.title} achievement={ach} />
                    ))}
                </div>
            </div>
        </section>
    );
}

ProgressDashboard.propTypes = {
  userData: PropTypes.shape({
    level: PropTypes.number,
    xp: PropTypes.number,
    nextLevelXP: PropTypes.number,
    stats: PropTypes.object,
    achievements: PropTypes.array,
  }),
};

ProgressDashboard.defaultProps = {
  userData: { level: 1, xp: 0, nextLevelXP: 100, stats: {}, achievements: [] },
};

export default memo(ProgressDashboard);
