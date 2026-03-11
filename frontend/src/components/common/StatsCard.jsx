import React, { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Animated number component for smooth counting transitions.
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
 * Individual card for displaying a single statistic.
 */
export default function StatsCard({ label, value, icon, color, isPrice, index }) {
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
