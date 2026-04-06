import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ClickParticle Component - Creates a visual burst effect at the click location.
 * Renders 8 particles that explode outward in a radial pattern with fading opacity.
 *
 * @param {Object} props - Component props
 * @param {number} props.x - X coordinate for the particle origin
 * @param {number} props.y - Y coordinate for the particle origin
 * @param {Function} props.onComplete - Callback invoked when animation completes
 * @returns {JSX.Element} The rendered particle burst effect
 */
const ClickParticle = memo(function ClickParticle({ x, y, onComplete }) {
    const particles = Array.from({ length: 8 });

    return (
        <div
            className="particle-container"
            style={{
                position: 'fixed',
                left: x,
                top: y,
                pointerEvents: 'none',
                zIndex: 9999
            }}
        >
            {particles.map((_, i) => {
                const angle = (i * 45) * (Math.PI / 180);
                const distance = 40 + Math.random() * 40;
                const targetX = Math.cos(angle) * distance;
                const targetY = Math.sin(angle) * distance;

                return (
                    <motion.div
                        key={i}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{
                            x: targetX,
                            y: targetY,
                            opacity: 0,
                            scale: 0.5
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        onAnimationComplete={i === 0 ? onComplete : undefined}
                        style={{
                            position: 'absolute',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: i % 2 === 0 ? 'hsl(var(--pulse-cyan))' : 'hsl(var(--pulse-purple))',
                            boxShadow: `0 0 10px ${i % 2 === 0 ? 'hsla(var(--pulse-cyan) / 0.5)' : 'hsla(var(--pulse-purple) / 0.5)'}`
                        }}
                    />
                );
            })}
        </div>
    );
});

ClickParticle.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    onComplete: PropTypes.func.isRequired,
};

/**
 * ParticleSystem Component - Manages multiple click particle effects.
 * Renders an animated transition group of ClickParticle components.
 *
 * @param {Object} props - Component props
 * @param {Array} props.clickEvents - Array of click event objects with id, x, y
 * @param {Function} props.removeEvent - Callback to remove a completed event
 * @returns {JSX.Element} The rendered particle system
 */
const ParticleSystem = memo(function ParticleSystem({ clickEvents, removeEvent }) {
    return (
        <AnimatePresence>
            {clickEvents.map(event => (
                <ClickParticle
                    key={event.id}
                    x={event.x}
                    y={event.y}
                    onComplete={() => removeEvent(event.id)}
                />
            ))}
        </AnimatePresence>
    );
});

ParticleSystem.propTypes = {
    clickEvents: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        })
    ).isRequired,
    removeEvent: PropTypes.func.isRequired,
};

export default ParticleSystem;
