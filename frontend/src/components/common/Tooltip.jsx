import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * A custom tooltip component for accessible and premium descriptions.
 */
export default function Tooltip({ text, content, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();
  const tooltipText = text ?? content;

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      aria-describedby={isVisible ? tooltipId : undefined}
      style={{ position: 'relative', display: 'inline-block', width: '100%' }}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="tooltip-content"
          >
            {tooltipText}
            <div className="tooltip-arrow" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string,
  content: PropTypes.node,
  children: PropTypes.node.isRequired,
};
