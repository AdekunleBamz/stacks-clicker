import React, { memo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Standard page transition wrapper using Framer Motion.
 * Provides a subtle fade and slide-up animation for main content areas.
 * Uses memoization to prevent unnecessary re-renders during page transitions.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to wrap with transition
 * @param {string} [props.className=''] - Additional CSS class names
 * @returns {JSX.Element} The rendered page transition wrapper
 */
const PageTransition = memo(function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`page-transition-wrapper ${className}`}
    >
      {children}
    </motion.div>
  );
});

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default PageTransition;
