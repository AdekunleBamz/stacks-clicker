import React, { useId, memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * A unified, reusable card component for the application.
 * Supports different depth levels, interactive states, and proper ARIA accessibility.
 * Uses memoization to prevent unnecessary re-renders.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to render inside the card body
 * @param {string} [props.title] - Optional card title
 * @param {string} [props.subtitle] - Optional card subtitle/description
 * @param {React.ReactNode} [props.icon] - Optional icon element or emoji
 * @param {number} [props.depth=1] - Visual depth level (1, 2, or 3)
 * @param {boolean} [props.interactive=false] - Whether the card has hover effects
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {React.ReactNode} [props.headerAction] - Optional action element in header
 * @returns {JSX.Element} The rendered card component
 */
const Card = ({
  children,
  title,
  subtitle,
  icon,
  depth = 1,
  interactive = false,
  className = '',
  headerAction,
  ...props
}) => {
  const id = useId();
  const titleId = `card-title-${id}`;
  const depthClass = `card-depth-${depth}`;
  const interactiveClass = interactive ? 'card-interactive' : '';

  return (
    <motion.div
      className={`card-wrapper glass-card ${depthClass} ${interactiveClass} ${className}`}
      role="region"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={subtitle ? `card-desc-${id}` : undefined}
      whileHover={interactive ? { y: -5, boxShadow: 'var(--shadow-lg)' } : {}}
      {...props}
    >
      {(title || icon || headerAction) && (
        <div className="card-header">
          <div className="card-title-group">
            {icon && <span className="card-icon" aria-hidden="true">{icon}</span>}
            <div className="card-text">
              {title && <h3 id={titleId} className="card-title">{title}</h3>}
              {subtitle && <p className="card-subtitle" id={`card-desc-${id}`}>{subtitle}</p>}
            </div>
          </div>
          {headerAction && <div className="card-header-action">{headerAction}</div>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </motion.div>
  );
});

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.node,
  depth: PropTypes.oneOf([1, 2, 3]),
  interactive: PropTypes.bool,
  className: PropTypes.string,
  headerAction: PropTypes.node,
};

export default memo(Card);
