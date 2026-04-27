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
  minWidth: '320px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

/**
 * Returns the icon emoji for a given toast type.
 */
function getIconForType(type) {
  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
    loading: '⏳',
    custom: '💬',
  };
  return icons[type] || '💬';
}

/**
 * Returns glassmorphic style object with color accent.
 */
function getGlassStyle(color) {
  return {
    ...toastStyle,
    border: `1px solid ${color}30`,
    boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${color}10`,
  };
}

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
