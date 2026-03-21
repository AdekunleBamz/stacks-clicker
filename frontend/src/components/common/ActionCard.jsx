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
  return (
    <motion.div
      className="action-card"
      role="region"
      aria-label={`${title} Interaction Card`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.4)', borderColor: 'rgba(99, 102, 241, 0.5)' }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
    >
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
