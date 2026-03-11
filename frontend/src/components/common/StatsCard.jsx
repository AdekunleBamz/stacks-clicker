import React, { useEffect, useState, memo } from 'react';
import { motion, animate } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Animated number component for smooth counting transitions between values.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number|string} props.value - The target numeric value to animate towards
 * @returns {JSX.Element} The rendered animated number
 */
function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (typeof value !== 'number') return;
    const controls = animate(displayValue, value, {
      duration: 1,
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [value, displayValue]);

  return <span>{typeof value === 'number' ? displayValue.toLocaleString() : value}</span>;
}

AnimatedNumber.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

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
 * @param {number} [props.index=0] - Index in the grid for staggered entrance animation
 * @returns {JSX.Element} The rendered stats card
 */
function StatsCard({ label, value, icon, color, isPrice = false, index = 0 }) {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.1
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
        borderColor: color + "44"
      }}
      style={{ '--accent-color': color }}
    >
      <div className="stat-icon" style={{ filter: `drop-shadow(0 0 8px ${color}44)` }}>
        {icon}
      </div>
      <div className="stat-content">
        <div className="value">
          {isPrice ? (
            <span>{value}</span>
          ) : (
            <AnimatedNumber value={value} />
          )}
        </div>
        <div className="label">{label}</div>
      </div>
    </motion.div>
  );
}

StatsCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  color: PropTypes.string.isRequired,
  isPrice: PropTypes.bool,
  index: PropTypes.number
};

export default memo(StatsCard);
