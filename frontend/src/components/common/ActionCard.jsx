import React, { useId, memo } from 'react';
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

  return (
    <motion.div
      className="action-card glass-card"
      role="region"
      aria-labelledby={titleId}
      aria-describedby={subtitle ? `action-desc-${id}` : undefined}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        boxShadow: '0 30px 60px -12px rgba(99, 102, 241, 0.45)', 
        borderColor: 'rgba(99, 102, 241, 0.6)' 
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
    >
      <div className="contract-header">
        <div className={`contract-icon ${iconClass}`} aria-hidden="true">{icon}</div>
        <div>
          <h3 id={titleId} className="contract-title">{title}</h3>
          {subtitle && <p className="contract-subtitle" id={`action-desc-${id}`}>{subtitle}</p>}
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

ActionCard.displayName = 'ActionCard';

export default memo(ActionCard);
