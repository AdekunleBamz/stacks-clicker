import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Leaderboard Component
 * Displays top players in a vibrant, ranked list
 */
Leaderboard.propTypes = {
    players: PropTypes.arrayOf(PropTypes.shape({
        address: PropTypes.string.isRequired,
        clicks: PropTypes.number,
        level: PropTypes.number,
    })).isRequired,
};

export default memo(Leaderboard);

function Leaderboard({ players }) {
    return (
        <div className="game-card leaderboard">
            <div className="game-header">
                <h2><span aria-hidden="true">🏆</span> Hall of Fame</h2>
                <span className="game-badge">Top Clickers</span>
            </div>

            <div className="leaderboard-list" role="list" aria-label="Top clicker players">
                {players.map((player, i) => (
                    <motion.div
                        key={player.address}
                        className={`leaderboard-item rank-${i + 1}`}
                        role="listitem"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <div className="rank-indicator" aria-label={`Rank ${i + 1}`}>{i + 1}</div>
                        <div className="player-info">
                            <span className="player-address">{player.address}</span>
                            <span className="player-stats">{player.clicks} Clicks • LVL {player.level}</span>
                        </div>
                        {i < 3 && <div className="medal-icon" aria-hidden="true">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
