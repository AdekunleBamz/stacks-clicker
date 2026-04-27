import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Animated SVG logo for the Stacks Clicker dApp.
 */
export default function NetworkLogo({ isSyncing = false }) {
  return (
    <motion.div
      className={`logo-glow ${isSyncing ? 'syncing' : ''}`}
      style={{ willChange: 'transform' }}
      whileHover={{ scale: 1.15, filter: 'brightness(1.2) drop-shadow(0 0 8px var(--primary-glow))' }}
      animate={isSyncing ? { rotate: 360 } : { rotate: [0, 5, -5, 0] }}
      transition={{ 
        rotate: isSyncing 
          ? { duration: 2, repeat: Infinity, ease: "linear" }
          : { duration: 4, repeat: Infinity, ease: "easeInOut" },
        scale: { type: 'spring', stiffness: 300, damping: 15 }
      }}
      role="img"
      aria-label="Stacks Clicker animated diamond logo"
      title="Stacks Clicker Network Logo"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stacks Clicker logo">
        <path d="M16 2L4 16L16 30L28 16L16 2Z" fill="url(#logo-grad)" />
        <path d="M16 6L8 16L16 26L24 16L16 6Z" fill="white" fillOpacity="0.2" />
        <defs>
          <linearGradient id="logo-grad" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
