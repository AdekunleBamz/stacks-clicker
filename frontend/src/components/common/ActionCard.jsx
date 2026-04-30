import { memo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Common Action Card layout component.
 * @param {Object} props - Component props.
 * @param {string} props.title - Card title.
 * @param {string} props.subtitle - Card subtitle.
 * @param {string} props.icon - Card icon (emoji or SVG).
 * @param {string} props.iconClass - CSS class for the icon container.
 * @param {React.ReactNode} props.children - Card actions and content.
 * @returns {JSX.Element} The rendered action card.
 */
function ActionCard({ title, subtitle, icon, iconClass, children, id }) {
  const headingId = id || `action-card-heading-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return (
    <motion.div
      className="contract-card"
      role="region"
      aria-labelledby={headingId}
      title={title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.2)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="contract-header">
        <div className={`contract-icon ${iconClass}`} aria-hidden="true">{icon}</div>
        <div>
          <h3 id={headingId} className="contract-title">{title}</h3>
          <p className="contract-subtitle">{subtitle}</p>
        </div>
      </div>
      <div className="actions" role="group" aria-label={`${title} actions`}>
        {children}
      </div>
    </motion.div>
  );
}

ActionCard.defaultProps = {
  subtitle: '',
  icon: null,
  iconClass: '',
  children: null,
};

ActionCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.node,
  iconClass: PropTypes.string,
  children: PropTypes.node,
};

export default memo(ActionCard);
