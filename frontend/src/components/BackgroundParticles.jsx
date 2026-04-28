import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * BackgroundParticles Component
 * Persistent floating particles for atmosphere
 */
function BackgroundParticles() {
    const particles = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 + '%',
        y: Math.random() * 100 + '%',
        opacity: Math.random() * 0.3 + 0.1,
        scale: Math.random() * 0.5 + 0.5,
        width: Math.random() * 10 + 2,
        height: Math.random() * 10 + 2,
        duration: Math.random() * 20 + 20,
        delay: Math.random() * -20,
        driftX: (Math.random() - 0.5) * 10 + '%',
    })), []);

    return (
        <div className="bg-particles" aria-hidden="true">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{
                        x: p.x,
                        y: p.y,
                        opacity: p.opacity,
                        scale: p.scale,
                    }}
                    animate={{
                        y: [null, '-20%', '120%'],
                        x: [null, p.driftX],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: p.delay,
                    }}
                    style={{
                        position: 'absolute',
                        width: p.width + 'px',
                        height: p.height + 'px',
                        borderRadius: '50%',
                        background: p.id % 2 === 0 ? 'hsl(var(--pulse-cyan))' : 'hsl(var(--pulse-purple))',
                        filter: 'blur(2px)',
                        willChange: 'transform, opacity',
                    }}
                />
            ))}
        </div>
    );
}

export default memo(BackgroundParticles);
