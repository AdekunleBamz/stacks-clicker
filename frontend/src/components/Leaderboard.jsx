import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { truncateAddress } from '../utils/format';

/**
 * Leaderboard Component
 * Displays top players in a vibrant, ranked list
 */
function Leaderboard({ players }) {
    return (
        <div className="game-card leaderboard" title="Top clicker rankings">
            <div className="game-header">
                <h2><span aria-hidden="true">🏆</span> Hall of Fame</h2>
                <span className="game-badge">Top Clickers</span>
            </div>

            <div className="leaderboard-list" role="list" aria-label="Top clicker players">
                {players.length === 0 && (
                    <p className="leaderboard-empty" role="listitem">No players yet. Be the first!</p>
                )}
                {players.map((player, i) => (
                    <motion.div
                        key={player.address}
                        className={`leaderboard-item rank-${i + 1}`}
                        role="listitem"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                        whileHover={{
                            scale: 1.02,
                            x: 10,
                            backgroundColor: "hsla(var(--bg-black) / 0.5)",
                            borderColor: "hsla(var(--pulse-cyan) / 0.4)"
                        }}
                    >
                        <div className="rank-indicator" aria-label={`Rank ${i + 1}`}>{i + 1}</div>
                        <div className="player-info">
                            <span className="player-address" title={player.address}>{truncateAddress(player.address, { prefix: 6, suffix: 4 })}</span>
                            <span className="player-stats" aria-label={`${player.clicks} clicks at level ${player.level}`}>{player.clicks} Clicks • LVL {player.level}</span>
                        </div>
                        {i < 3 && <div className="medal-icon" aria-hidden="true">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

Leaderboard.defaultProps = {
    players: [],
};

Leaderboard.propTypes = {
    players: PropTypes.arrayOf(PropTypes.shape({
        address: PropTypes.string.isRequired,
        clicks: PropTypes.number,
        level: PropTypes.number,
    })),
};

export default memo(Leaderboard);
