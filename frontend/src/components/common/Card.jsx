import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * A unified, reusable card component for the application.
 * Supports different depth levels and interactive states.
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
  const depthClass = `card-depth-${depth}`;
  const interactiveClass = interactive ? 'card-interactive' : '';

  return (
    <motion.div
      className={`app-card ${depthClass} ${interactiveClass} ${className}`}
      whileHover={interactive ? { y: -5, boxShadow: 'var(--shadow-lg)' } : {}}
      {...props}
    >
      {(title || icon || headerAction) && (
        <div className="card-header">
          <div className="card-title-group">
            {icon && <span className="card-icon">{icon}</span>}
            <div className="card-text">
              {title && <h3 className="card-title">{title}</h3>}
              {subtitle && <p className="card-subtitle">{subtitle}</p>}
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
};

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

export default Card;
