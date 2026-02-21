import React from 'react';
import { motion } from 'framer-motion';

/**
 * LevelBadge Component
 * Displays the current level with a premium, animated badge
 */
export default function LevelBadge({ level }) {
    return (
        <motion.div
            className="level-badge-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
        >
            <div className="level-badge-glow"></div>
            <div className="level-badge-inner">
                <span className="level-text">LVL</span>
                <span className="level-number">{level}</span>
            </div>

            {/* Mini orbiting particles */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="level-particle"
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: i === 0 ? 'hsl(var(--pulse-cyan))' : 'hsl(var(--pulse-purple))',
                        top: '50%',
                        left: '50%',
                        marginLeft: '-2px',
                        marginTop: '-2px',
                        transformOrigin: `${25 + i * 5}px center`,
                    }}
                />
            ))}
        </motion.div>
    );
}
