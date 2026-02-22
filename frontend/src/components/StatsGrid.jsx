import React from 'react';
import { motion } from 'framer-motion';
import CountUp from './CountUp';

/**
 * StatsGrid Component
 * Displays advanced game metrics in a grid
 */
export default function StatsGrid({ stats }) {
    const statItems = [
        { label: 'Total STX Tipped', value: stats.totalTipped || 0, decimals: 4, unit: 'STX', icon: '💰' },
        { label: 'Click Rate', value: stats.clickRate || 0, decimals: 1, unit: 'c/s', icon: '⚡' },
        { label: 'Total Streaks', value: stats.totalStreaks || 0, decimals: 0, unit: '', icon: '🔥' },
        { label: 'Global Rank', value: stats.rank || '-', decimals: 0, unit: '', icon: '🏆', isString: typeof stats.rank === 'string' }
    ];

    return (
        <div className="stats-grid-container">
            {statItems.map((item, i) => (
                <motion.div
                    key={item.label}
                    className="stat-card-mini"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5, borderColor: 'hsla(var(--pulse-cyan) / 0.4)' }}
                >
                    <div className="stat-card-header">
                        <span className="stat-icon">{item.icon}</span>
                        <span className="stat-card-label">{item.label}</span>
                    </div>
                    <div className="stat-card-value">
                        {item.isString ? (
                            item.value
                        ) : (
                            <CountUp value={item.value} decimals={item.decimals} suffix={item.unit ? ` ${item.unit}` : ''} />
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
