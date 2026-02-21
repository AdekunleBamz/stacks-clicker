import React from 'react';
import { motion } from 'framer-motion';

/**
 * Leaderboard Component
 * Displays top players in a vibrant, ranked list
 */
export default function Leaderboard({ players }) {
    return (
        <div className="game-card leaderboard">
            <div className="game-header">
                <h2>🏆 Hall of Fame</h2>
                <span className="game-badge">Top Clickers</span>
            </div>

            <div className="leaderboard-list">
                {players.map((player, i) => (
                    <motion.div
                        key={player.address}
                        className={`leaderboard-item rank-${i + 1}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <div className="rank-indicator">{i + 1}</div>
                        <div className="player-info">
                            <span className="player-address">{player.address}</span>
                            <span className="player-stats">{player.clicks} Clicks • LVL {player.level}</span>
                        </div>
                        {i < 3 && <div className="medal-icon">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
