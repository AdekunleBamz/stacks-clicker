import React from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const getIconForType = (type) => {
  switch (type) {
    case 'success':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', color: 'var(--success)' }}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      );
    case 'error':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', color: 'var(--error)' }}>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      );
    case 'info':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', color: 'var(--primary)' }}>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      );
    case 'warning':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', color: 'var(--warning)' }}>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      );
    case 'loading':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', color: 'var(--primary)' }} className="animate-spin">
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
      );
    default:
      return null;
  }
};

const getGlassStyle = (color) => ({
  borderRadius: '16px',
  cursor: 'default',
  background: 'var(--glass-bg)',
  color: 'var(--text-main)',
  border: '1px solid var(--glass-border)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  padding: '14px 24px',
  fontSize: '0.95rem',
  fontWeight: '600',
  boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px ${color}20`,
  position: 'relative',
  overflow: 'hidden',
  minWidth: '320px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

/**
 * Premium glassmorphic toast notification component.
 */
const GlassToast = ({ t, message, type, isLoading = false }) => {
  const icon = getIconForType(type);
  const colorMap = {
    success: 'var(--success)',
    error: 'var(--error)',
    info: 'var(--primary)',
    warning: 'var(--warning)',
    loading: 'var(--text-main)',
    custom: 'var(--primary)',
  };
  const color = colorMap[type] || 'var(--primary)';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      style={{
        ...getGlassStyle(color),
        opacity: t.visible ? 1 : 0
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ 
          background: `${color}15`, 
          padding: '8px', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: `1px solid ${color}30`
        }}>
          {icon}
        </div>
        <span style={{ letterSpacing: '0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{message}</span>
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
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            boxShadow: `0 0 12px ${color}`
          }}
        />
      )}
    </motion.div>
  );
};

export const notify = {
  success: (message, options = {}) => toast.custom((t) => <GlassToast t={t} message={message} type="success" />, options),
  error: (message, options = {}) => toast.custom((t) => <GlassToast t={t} message={message} type="error" />, options),
  info: (message, options = {}) => toast.custom((t) => <GlassToast t={t} message={message} type="info" />, options),
  warning: (message, options = {}) => toast.custom((t) => <GlassToast t={t} message={message} type="warning" />, options),
  loading: (message, options = {}) => toast.custom((t) => <GlassToast t={t} message={message} type="loading" isLoading={true} />, { ...options, duration: Infinity }),
  custom: (message, icon, options = {}) => toast.custom((t) => <GlassToast t={t} message={message} type="custom" />, options),
  dismiss: (toastId) => toast.dismiss(toastId)
};

export default notify;
