import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * A floating particle effect component to celebrate successful interactions.
 */
export default function ParticleOverlay({ trigger }) {
  const [particles, setParticles] = useState([]);

  const createParticles = useCallback((count = 12) => {
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50, // relative to center
      y: Math.random() * 100 - 50,
      scale: Math.random() * 0.5 + 0.5,
      color: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 4)],
    }));
    setParticles((prev) => [...prev, ...newParticles]);

    // Cleanup after animation
    setTimeout(() => {
      setParticles((prev) => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);
  }, []);

  useEffect(() => {
    if (trigger) {
      createParticles();
    }
  }, [trigger, createParticles]);

  return (
    <div className="particle-container" style={{ position: 'fixed', top: '50%', left: '50%', pointerEvents: 'none', zIndex: 1000 }}>
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{
              x: particle.x * 4,
              y: particle.y * 4,
              opacity: 0,
              scale: particle.scale,
              rotate: Math.random() * 360
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: 'absolute',
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: particle.color,
              boxShadow: `0 0 10px ${particle.color}`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
