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

/**
 * Progress indicator component for toast notifications.
 */
const ToastWithProgress = ({ t, message, icon, color, isLoading = false }) => (
  <div style={toastStyle}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {icon && <span style={{ fontSize: '1.2rem' }}>{icon}</span>}
      <span>{message}</span>
    </div>
    {!isLoading && (
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
    )}
  </div>
);

/**
 * Premium toast utility for consistent notifications with progress bars.
 */
export const notify = {
  success: (message, options = {}) => toast.custom((t) => <GlassToast t={t} message={message} type="success" />, options),
  error: (message, options = {}) => toast.custom((t) => <GlassToast t={t} message={message} type="error" />, options),
  info: (message, options = {}) => toast.custom((t) => <GlassToast t={t} message={message} type="info" />, options),
  warning: (message, options = {}) => toast.custom((t) => <GlassToast t={t} message={message} type="warning" />, options),
  loading: (message, options = {}) => toast.custom((t) => <GlassToast t={t} message={message} type="loading" isLoading={true} />, { ...options, duration: Infinity }),
  custom: (message, options = {}) => toast.custom((t) => <GlassToast t={t} message={message} type="custom" />, options),
  dismiss: (toastId) => toast.dismiss(toastId)
};

export default notify;
