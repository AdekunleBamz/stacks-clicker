import { memo } from 'react';
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
function SkeletonLoader({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '8px', 
  className = '', 
  label = 'content',
  gradientAngle = 90,
  shimmerColor = 'rgba(255, 255, 255, 0.05)'
}) {
  return (
    <div
      className={`skeleton-wrapper ${className}`}
      aria-busy="true"
      role="status"
      aria-live="polite"
      aria-label={`Loading ${label}...`}
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
          background: `linear-gradient(${gradientAngle}deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
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
  className: PropTypes.string,
  label: PropTypes.string,
  gradientAngle: PropTypes.number,
  shimmerColor: PropTypes.string
};

export default memo(SkeletonLoader);
