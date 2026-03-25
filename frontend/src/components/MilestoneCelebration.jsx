import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Overlay component that showcases a celebration when a milestone is reached.
 *
 * @param {Object} props - Component props.
 * @param {string|null} props.celebration - The celebration message to display.
 */
export default function MilestoneCelebration({ celebration }) {
  const particles = ['🎉', '💎', '🔥', '✨', '🚀', '⭐'];

  return (
    <AnimatePresence>
      {celebration && (
        <motion.div
          className="milestone-celebration"
          role="status"
          aria-live="assertive"
          aria-atomic="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)'
          }}
        >
          {particles.map((emoji, i) => (
            <motion.span
              key={i}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{ 
                x: (Math.random() - 0.5) * 600, 
                y: (Math.random() - 0.5) * 600, 
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                rotate: (Math.random() - 0.5) * 720
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeOut"
              }}
              style={{ position: 'absolute', fontSize: '2rem' }}
            >
              {emoji}
            </motion.span>
          ))}
          <motion.div
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 12, stiffness: 100 }}
            className="milestone-text glass-card-premium"
            role="alert"
            aria-label={`Celebration: ${celebration}`}
            style={{
              padding: '2rem 3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              fontSize: '2.5rem',
              fontWeight: 800,
              color: 'white',
              boxShadow: '0 0 50px rgba(99, 102, 241, 0.5)'
            }}
          >
            <span className="celebration-emoji" aria-hidden="true">🎉</span>
            <span className="celebration-message">{celebration}</span>
            <span className="celebration-emoji" aria-hidden="true">💎</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

MilestoneCelebration.propTypes = {
  celebration: PropTypes.string
};
