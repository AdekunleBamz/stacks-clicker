import React from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const toastStyle = {
  borderRadius: '16px',
  cursor: 'default',
  background: 'var(--bg-card)',
  color: 'var(--text-main)',
  border: '1px solid var(--border)',
  backdropFilter: 'blur(12px)',
  padding: '12px 20px',
  fontSize: '0.9rem',
  fontWeight: '500',
  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
  position: 'relative',
  overflow: 'hidden',
  minWidth: '280px'
};

const ToastWithProgress = ({ t, message, icon, color }) => (
  <div style={toastStyle}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {icon && <span style={{ fontSize: '1.2rem' }}>{icon}</span>}
      <span>{message}</span>
    </div>
    <motion.div
      initial={{ width: '100%' }}
      animate={{ width: 0 }}
      transition={{ duration: (t.duration || 4000) / 1000, ease: 'linear' }}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '3px',
        background: color || 'var(--primary)',
        boxShadow: `0 0 8px ${color || 'var(--primary)'}`
      }}
    />
  </div>
);

/**
 * Premium toast utility for consistent notifications with progress bars.
 */
export const notify = {
  success: (message, options = {}) => 
    toast.custom((t) => (
      <ToastWithProgress t={t} message={message} icon="✅" color="var(--success)" />
    ), options),
  
  error: (message, options = {}) => 
    toast.custom((t) => (
      <ToastWithProgress t={t} message={message} icon="❌" color="var(--error)" />
    ), options),
    
  info: (message, options = {}) => 
    toast.custom((t) => (
      <ToastWithProgress t={t} message={message} icon="ℹ️" color="var(--primary)" />
    ), options),
    
  warning: (message, options = {}) => 
    toast.custom((t) => (
      <ToastWithProgress t={t} message={message} icon="⚠️" color="var(--warning)" />
    ), options),

  custom: (message, icon, options = {}) =>
    toast.custom((t) => (
      <ToastWithProgress t={t} message={message} icon={icon} color="var(--primary)" />
    ), options)
};

export default notify;
