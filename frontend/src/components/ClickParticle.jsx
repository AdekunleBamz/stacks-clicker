import { memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * ClickParticle Component
 * Creates a visual "burst" effect at the click location
 */
const ClickParticle = ({ x, y, onComplete }) => {
    const particles = useMemo(() => Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45) * (Math.PI / 180);
        const distance = 40 + Math.random() * 40;
        return {
            i,
            targetX: Math.cos(angle) * distance,
            targetY: Math.sin(angle) * distance,
        };
    }), []);

    return (
        <div
            className="particle-container"
            aria-hidden="true"
            style={{
                position: 'fixed',
                left: x,
                top: y,
                pointerEvents: 'none',
                zIndex: 9999
            }}
        >
            {particles.map(({ i, targetX, targetY }) => {
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
};

ClickParticle.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    onComplete: PropTypes.func,
};

ClickParticle.defaultProps = {
    onComplete: undefined,
};

export default memo(function ParticleSystem({ clickEvents, removeEvent }) {
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
