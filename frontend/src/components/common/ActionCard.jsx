import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Common Action Card layout component that provides a consistent container for contract interactions.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - Main title of the card
 * @param {string} [props.subtitle] - Brief description or secondary text
 * @param {React.ReactNode} [props.icon] - Icon or emoji to represent the action
 * @param {string} [props.iconClass=''] - Additional CSS class for the icon container (e.g., for color)
 * @param {React.ReactNode} props.children - Action buttons and inputs to be rendered inside the card
 * @returns {JSX.Element} The rendered action card
 */
function ActionCard({ title, subtitle, icon, iconClass = '', children }) {
  const id = useId();
  const titleId = `action-title-${id}`;
  
  const mouseX = motion.useMotionValue(0);
  const mouseY = motion.useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className="action-card glass-card premium-hover-effect"
      onMouseMove={handleMouseMove}
      role="region"
      aria-labelledby={titleId}
      aria-describedby={subtitle ? `action-desc-${id}` : undefined}
      layout
      style={{ 
        willChange: 'transform, opacity',
        position: 'relative',
        overflow: 'hidden'
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.4)', borderColor: 'rgba(99, 102, 241, 0.5)' }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
    >
      {/* Dynamic Mouse Spotlight Glow */}
      <motion.div
        className="highlight-spotlight"
        style={{
          background: motion.useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.15),
              transparent 80%
            )
          `,
          position: 'absolute',
          inset: -1,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div className="contract-header">
        <div className={`contract-icon ${iconClass}`}>{icon}</div>
        <div>
          <div className="contract-title">{title}</div>
          <div className="contract-subtitle">{subtitle}</div>
        </div>
      </div>
      <div className="actions">
        {children}
      </div>
    </motion.div>
  );
}

ActionCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  iconClass: PropTypes.string,
  children: PropTypes.node
};

export default memo(ActionCard);
