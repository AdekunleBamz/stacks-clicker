import React from 'react';
import { motion } from 'framer-motion';

/**
 * Premium skeleton loader component with shimmer effect.
 */
export default function SkeletonLoader({ width = '100%', height = '20px', borderRadius = '8px', className = '' }) {
  return (
    <div
      className={`skeleton-wrapper ${className}`}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <motion.div
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
        }}
      />
    </div>
  );
}
