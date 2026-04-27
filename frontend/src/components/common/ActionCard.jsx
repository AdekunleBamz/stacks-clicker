import React, { memo } from 'react';
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
function ActionCard({ title, subtitle, icon, iconClass, children }) {
  return (
    <motion.div
      className="contract-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.2)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
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
