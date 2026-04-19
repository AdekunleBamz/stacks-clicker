import React, { useEffect, useState, memo } from 'react';
import { animate } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Animated number component for smooth counting transitions between values.
 * Uses Framer Motion's internal 'animate' function for high-performance interpolation.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number|string} props.value - The target numeric value to animate towards
 * @param {number} [props.duration=1] - Animation duration in seconds
 * @returns {JSX.Element} The rendered animated number
 */
const AnimatedNumber = ({ value, duration = 1 }) => {
  const [displayValue, setDisplayValue] = useState(() => typeof value === 'number' ? value : 0);

  useEffect(() => {
    if (typeof value !== 'number') return;

    const controls = animate(displayValue, value, {
      duration,
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });

    return () => controls.stop();
  }, [value, duration]); // Intentionally not including displayValue to avoid infinite loops

  return (
    <span
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="animated-number"
    >
      {typeof value === 'number' ? displayValue.toLocaleString() : value}
    </span>
  );
};

AnimatedNumber.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  duration: PropTypes.number
};

export default memo(AnimatedNumber);
