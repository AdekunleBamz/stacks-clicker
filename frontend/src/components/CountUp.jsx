import { useEffect, useState, useRef, memo } from 'react';
import { animate } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * CountUp Component - Animates a number from its current value to a new target value.
 * Uses Framer Motion's animate function for smooth number transitions.
 * Uses memoization to prevent unnecessary re-renders.
 *
 * @param {Object} props - Component props
 * @param {number} props.value - Target numeric value to animate to
 * @param {number} [props.decimals=0] - Number of decimal places to display
 * @param {string} [props.prefix=''] - String to prepend to the displayed value
 * @param {string} [props.suffix=''] - String to append to the displayed value
 * @returns {JSX.Element} The rendered animated number
 */
const CountUp = memo(function CountUp({ value, decimals = 0, prefix = '', suffix = '' }) {
    const [displayValue, setDisplayValue] = useState(() => Number(value).toFixed(decimals));
    const prevValue = useRef(value);

    useEffect(() => {
        const controls = animate(prevValue.current, value, {
            duration: 1,
            onUpdate: (latest) => {
                setDisplayValue(latest.toFixed(decimals));
            }
        });

        prevValue.current = value;
        return () => controls.stop();
    }, [value, decimals]);

    return (
        <span className="count-up" aria-hidden="true">
            {prefix}{displayValue}{suffix}
            <span className="sr-only" aria-live="polite" aria-atomic="true">
                {prefix}{Number(value).toFixed(decimals)}{suffix}
            </span>
        </span>
    );
});

CountUp.propTypes = {
    value: PropTypes.number.isRequired,
    decimals: PropTypes.number,
    prefix: PropTypes.string,
    suffix: PropTypes.string
};

export default CountUp;
