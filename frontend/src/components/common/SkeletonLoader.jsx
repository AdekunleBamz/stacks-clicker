import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Premium skeleton loader component with shimmer effect for improved perceived performance.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string|number} [props.width='100%'] - Width of the skeleton block
 * @param {string|number} [props.height='20px'] - Height of the skeleton block
 * @param {string|number} [props.borderRadius='8px'] - Border radius for the block
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {JSX.Element} The rendered skeleton loader
 */
function SkeletonLoader({ width = '100%', height = '20px', borderRadius = '8px', className = '', label = 'content' }) {
  return (
    <div
      className={`skeleton-wrapper ${className}`}
      role="status"
      aria-busy="true"
      aria-label={`Loading ${label}...`}
      title={`Loading ${label}...`}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: 'var(--skeleton-base, rgba(255, 255, 255, 0.05))',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <motion.div
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "linear"
        }}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
          willChange: 'transform'
        }}

      />
    </div>
  );
}

SkeletonLoader.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};

SkeletonLoader.displayName = 'SkeletonLoader';

export default memo(SkeletonLoader);
