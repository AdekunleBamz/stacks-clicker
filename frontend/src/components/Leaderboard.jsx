import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const MEDAL_ICONS = ['🥇', '🥈', '🥉'];

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

            <div className="leaderboard-list" role="list" aria-label="Top clickers leaderboard">
                {players.map((player, i) => (
                    <motion.div
                        key={player.address}
                        role="listitem"
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
                        {i < 3 && <div className="medal-icon">{MEDAL_ICONS[i]}</div>}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

Leaderboard.propTypes = {
    players: PropTypes.arrayOf(
        PropTypes.shape({
            address: PropTypes.string.isRequired,
            clicks: PropTypes.number.isRequired,
            level: PropTypes.number.isRequired,
        })
    ).isRequired,
};
