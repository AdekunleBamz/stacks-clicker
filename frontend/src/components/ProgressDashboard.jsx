import React from 'react';
import { motion } from 'framer-motion';
import XPProgress from './XPProgress';
import LevelBadge from './LevelBadge';
import StatsGrid from './StatsGrid';
import Achievement from './Achievement';

/**
 * ProgressDashboard Component
 * Aggregate view for player progression
 */
export default function ProgressDashboard({ userData }) {
    const { level, xp, nextLevelXP, stats, achievements } = userData;

    return (
        <section className="progress-dashboard">
            <div className="dashboard-section-header">
                <h2>🏆 Progress Dashboard</h2>
                <p>Your journey in the Stacks Ecosystem</p>
            </div>

            <div className="dashboard-main-row">
                <LevelBadge level={level} />
                <div style={{ flex: 1 }}>
                    <XPProgress currentXP={xp} nextLevelXP={nextLevelXP} level={level} />
                </div>
            </div>

            <StatsGrid stats={stats} />

            <div className="achievements-section" style={{ marginTop: '3rem' }}>
                <h3 style={{ marginBottom: '1.5rem', fontWeight: 800 }}>Milestones</h3>
                <div className="achievements-list">
                    {achievements.map((ach, i) => (
                        <Achievement key={i} achievement={ach} />
                    ))}
                </div>
            </div>
        </section>
    );
}
