import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * A custom tooltip component for accessible and premium descriptions with delayed entry and smooth exit.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.content - The content to display inside the tooltip
 * @param {React.ReactNode} props.children - The element that triggers the tooltip on hover
 * @returns {JSX.Element} The rendered tooltip wrapper
 */
function Tooltip({ content, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    let timer;
    if (shouldShow) {
      timer = setTimeout(() => setIsVisible(true), 300);
    } else {
      setIsVisible(false);
    }
    return () => clearTimeout(timer);
  }, [shouldShow]);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setShouldShow(true)}
      onMouseLeave={() => setShouldShow(false)}
      onFocus={() => setShouldShow(true)}
      onBlur={() => setShouldShow(false)}
      style={{ position: 'relative', display: 'inline-block', width: '100%' }}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="tooltip-content"
            role="tooltip"
            aria-atomic="true"
            aria-live="polite"
          >
            {content}
            <div className="tooltip-arrow" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

Tooltip.propTypes = {
  content: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
};

export default memo(Tooltip);
