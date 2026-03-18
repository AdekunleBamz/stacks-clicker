import { toast } from 'react-hot-toast';

const toastStyle = {
  borderRadius: '16px',
  background: 'var(--bg-card)',
  color: 'var(--text-main)',
  border: '1px solid var(--border)',
  backdropFilter: 'blur(12px)',
  padding: '12px 20px',
  fontSize: '0.9rem',
  fontWeight: '500',
  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
};

/**
 * Premium toast utility for consistent notifications.
 */
export const notify = {
  success: (message, options = {}) => 
    toast.success(message, {
      ...options,
      style: { ...toastStyle, borderLeft: '4px solid var(--success)' },
      iconTheme: { primary: 'var(--success)', secondary: '#fff' }
    }),
  
  error: (message, options = {}) => 
    toast.error(message, {
      ...options,
      style: { ...toastStyle, borderLeft: '4px solid var(--error)' },
      iconTheme: { primary: 'var(--error)', secondary: '#fff' }
    }),
    
  info: (message, options = {}) => 
    toast(message, {
      ...options,
      icon: 'ℹ️',
      style: { ...toastStyle, borderLeft: '4px solid var(--primary)' }
    }),
    
  warning: (message, options = {}) => 
    toast(message, {
      ...options,
      icon: '⚠️',
      style: { ...toastStyle, borderLeft: '4px solid var(--warning)' }
    }),

  custom: (message, icon, options = {}) =>
    toast(message, {
      ...options,
      icon,
      style: { ...toastStyle, borderLeft: '4px solid var(--primary)' }
    })
};

export default notify;
