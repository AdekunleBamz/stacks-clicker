import React, { useState, useEffect, useId, memo } from 'react';
import { useHover } from '../../hooks/useHover';
import { useFocus } from '../../hooks/useFocus';
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
  const id = useId();
  const tooltipId = `tooltip-${id}`;
  const shouldShow = isHovered || isFocused;

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
      ref={(node) => {
        hoverRef.current = node;
        focusRef.current = node;
      }}
      className="tooltip-wrapper"
      style={{ position: 'relative', display: 'inline-block', width: '100%' }}
    >
      {React.cloneElement(children, {
        'aria-describedby': isVisible ? tooltipId : undefined
      })}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={tooltipId}
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

Tooltip.displayName = 'Tooltip';

export default memo(Tooltip);
