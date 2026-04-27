import { useEffect, useState, memo } from 'react';
import { motion, animate } from 'framer-motion';
import PropTypes from 'prop-types';
import AnimatedNumber from './AnimatedNumber';
import Tooltip from './Tooltip';
import { useMeasure } from '../../hooks/useMeasure';


/**
 * Individual card for displaying a single statistic with animations and thematic coloring.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.label - Descriptive label for the statistic
 * @param {number|string} props.value - Numeric or string value to display
 * @param {React.ReactNode} props.icon - Icon element or emoji representing the stat
 * @param {string} props.color - Theme color used for accents and glows
 * @param {boolean} [props.isPrice=false] - If true, treats the value as a price (no counting animation)
 * @param {boolean} [props.isGrowing=false] - If true, applies a pulse animation to the card
 * @param {number} [props.index=0] - Index in the grid for staggered entrance animation
 * @param {string} [props.tooltip] - Optional description for the tooltip
 * @returns {JSX.Element} The rendered stats card
 */
function StatsCard({ label, value, icon, color, isPrice = false, isGrowing = false, index = 0, tooltip }) {
  const [measureRef, { width, height }] = useMeasure();

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const cardContent = (
    <motion.div
      ref={measureRef}
      className={`stat-card glass-card ${isGrowing ? 'stat-growing' : ''}`}
      role="article"
      aria-labelledby={`stat-label-${index}`}
      aria-describedby={`stat-value-${index}`}
      variants={itemVariants}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
        borderColor: color + "44"
      }}
      style={{
        '--accent-color': color,
        '--card-width': `${width}px`,
        '--card-height': `${height}px`
      }}
    >
      <div className="stat-icon" style={{ filter: `drop-shadow(0 0 8px ${color}44)` }} aria-hidden="true">
        {icon}
      </div>
      <div className="stat-content">
        <div className="value" id={`stat-value-${index}`}>
          {isPrice ? (
            <span>{value}</span>
          ) : (
            <AnimatedNumber value={value} />
          )}
        </div>
        <div className="label" id={`stat-label-${index}`}>{label}</div>
        {!isPrice && typeof value === 'number' && (
          <div
            className="progress-container"
            role="progressbar"
            aria-valuenow={Math.min(value % 100, 100)}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuetext={`${Math.floor(Math.min(value % 100, 100))}% towards next milestone`}
            aria-label={`${label} progress`}
          >
            <motion.div
              className="progress-bar"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(((value % 100) / 100) * 100, 100)}%` }}
              style={{ background: color }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );

  return tooltip ? <Tooltip content={tooltip}>{cardContent}</Tooltip> : cardContent;
}

StatsCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  color: PropTypes.string.isRequired,
  isPrice: PropTypes.bool,
  isGrowing: PropTypes.bool,
  index: PropTypes.number,
  tooltip: PropTypes.string
};

StatsCard.displayName = 'StatsCard';

export default memo(StatsCard);
