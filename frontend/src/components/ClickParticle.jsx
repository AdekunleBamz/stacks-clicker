import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ClickParticle Component
 * Creates a visual "burst" effect at the click location
 */
const ClickParticle = ({ x, y, onComplete }) => {
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
};

export default function ParticleSystem({ clickEvents, removeEvent }) {
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
}
