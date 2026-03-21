import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated SVG logo for the Stacks Clicker dApp.
 */
export default function NetworkLogo() {
  return (
    <motion.div
      className="logo-glow"
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stacks Interactive Clicker Logo">
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
