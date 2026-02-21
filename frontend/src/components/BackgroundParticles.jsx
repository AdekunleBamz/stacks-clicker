import React from 'react';
import { motion } from 'framer-motion';

/**
 * BackgroundParticles Component
 * Persistent floating particles for atmosphere
 */
export default function BackgroundParticles() {
    const particles = Array.from({ length: 15 });

    return (
        <div className="bg-particles">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: Math.random() * 0.3 + 0.1,
                        scale: Math.random() * 0.5 + 0.5
                    }}
                    animate={{
                        y: [null, "-20%", "120%"],
                        x: [null, (Math.random() - 0.5) * 10 + "%"]
                    }}
                    transition={{
                        duration: Math.random() * 20 + 20,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * -20
                    }}
                    style={{
                        position: 'absolute',
                        width: Math.random() * 10 + 2 + 'px',
                        height: Math.random() * 10 + 2 + 'px',
                        borderRadius: '50%',
                        background: i % 2 === 0 ? 'hsl(var(--pulse-cyan))' : 'hsl(var(--pulse-purple))',
                        filter: 'blur(2px)',
                    }}
                />
            ))}
        </div>
    );
}
