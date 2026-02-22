import React from 'react';
import { motion } from 'framer-motion';

/**
 * XPProgress Component
 * Displays a vibrant, animated progress bar for leveling
 */
export default function XPProgress({ currentXP, nextLevelXP, level }) {
    const percentage = Math.min((currentXP / nextLevelXP) * 100, 100);

    return (
        <div className="xp-container">
            <div className="xp-header">
                <span className="level-label">Level {level}</span>
                <span className="xp-label">{currentXP} / {nextLevelXP} XP</span>
            </div>

            <div className="xp-bar-bg">
                <motion.div
                    className="xp-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                        background: `linear-gradient(90deg, hsl(var(--pulse-cyan)), hsl(var(--pulse-purple)))`,
                        boxShadow: `0 0 15px hsla(var(--pulse-cyan) / 0.5)`
                    }}
                />
            </div>

            <div className="xp-percentage">{percentage.toFixed(0)}% to next level</div>
        </div>
    );
}
