import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * A unified, reusable button component for the application.
 * Supports different variants, sizes, and loading states with smooth Framer Motion animations.
 * Uses memoization to prevent unnecessary re-renders.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.variant='primary'] - Button variant style
 * @param {string} [props.size='md'] - Button size
 * @param {boolean} [props.isLoading=false] - Loading state
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.className=''] - Additional CSS class
 * @param {string} [props.type='button'] - HTML button type attribute
 * @param {React.ReactNode} [props.icon] - Optional icon element
 * @returns {JSX.Element} The rendered button
 */
const Button = memo(function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  type = 'button',
  icon,
  ...props
}) => {
  const baseClass = 'app-btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const loadingClass = isLoading ? 'btn-loading' : '';

  return (
    <motion.button
      type={type}
      className={`${baseClass} ${variantClass} ${sizeClass} ${loadingClass} glass-card ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      aria-label={isLoading ? `Processing ${typeof children === 'string' ? children : 'action'}` : undefined}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {isLoading ? (
        <span className="btn-spinner" role="progressbar" aria-label="Loading" aria-live="polite"></span>
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
});

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.node,
};

export default Button;
