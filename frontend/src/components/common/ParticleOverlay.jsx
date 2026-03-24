import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * A floating particle effect component to celebrate successful on-chain interactions.
 * Triggers a burst of animated emojis/particles at the center of the screen.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean|number|string} props.trigger - A truthy value or changing signal that triggers the particle burst
 * @returns {JSX.Element} The rendered particle overlay
 */
export default function ParticleOverlay({ trigger }) {
  const [particles, setParticles] = useState([]);
  const timeoutsMode = useRef([]);

  /**
   * Generates a batch of randomized particles and manages their lifecycle.
   *
   * @param {number} [count=12] - Number of particles to generate in a single burst
   */
  const createParticles = useCallback((count = 12) => {
    const batchId = Date.now();
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: `${batchId}-${i}`,
      x: Math.random() * 100 - 50, // Relative to center
      y: Math.random() * 100 - 50,
      scale: Math.random() * 0.5 + 0.5,
      color: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 4)],
      emoji: ['💎', '✨', '🚀', '🔥', '🎨'][Math.floor(Math.random() * 5)]
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    // Schedule cleanup after the animation duration (1s)
    const timeout = setTimeout(() => {
      setParticles((prev) => prev.filter(p => !newParticles.find(np => np.id === p.id)));
      timeoutsMode.current = timeoutsMode.current.filter(t => t !== timeout);
    }, 1000);

    timeoutsMode.current.push(timeout);
  }, []);

  useEffect(() => {
    if (trigger) {
      createParticles();
    }
  }, [trigger, createParticles]);

  // Cleanup all pending timeouts on unmount
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeoutsMode.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      className="particle-container"
      aria-hidden="true"
      role="presentation"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        pointerEvents: 'none',
        zIndex: 1000
      }}
    >
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
              fontSize: `${particle.scale * 20}px`,
              textShadow: `0 0 10px ${particle.color}`,
              userSelect: 'none'
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

ParticleOverlay.propTypes = {
  trigger: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string
  ])
};
