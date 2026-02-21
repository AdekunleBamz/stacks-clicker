import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';

/**
 * CountUp Component
 * Animates a number from its current value to a new target value
 */
export default function CountUp({ value, decimals = 0, prefix = '', suffix = '' }) {
    const [displayValue, setDisplayValue] = useState(value);
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
        <span className="count-up">
            {prefix}{displayValue}{suffix}
        </span>
    );
}
