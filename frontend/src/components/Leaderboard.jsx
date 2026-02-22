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
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                        whileHover={{
                            scale: 1.02,
                            x: 10,
                            backgroundColor: "hsla(var(--bg-black) / 0.5)",
                            borderColor: "hsla(var(--pulse-cyan) / 0.4)"
                        }}
                    >
                        <div className="rank-indicator">{i + 1}</div>
                        <div className="player-info">
                            <span className="player-address">{player.address}</span>
                            <span className="player-stats">{player.clicks.toLocaleString()} Clicks • LVL {player.level}</span>
                        </div>
                        {i < 3 && (
                            <motion.div
                                className="medal-icon"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
