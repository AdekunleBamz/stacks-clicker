import { useCallback } from 'react';
import { notify } from '../utils/toast';

/**
 * Custom hook for triggering application-wide notifications.
 * Provides a standardized way to send feedback messages from any component.
 *
 * @returns {Object} { showNotification, showSuccess, showError, showLoading }
 */
export function useNotifications() {
  const showNotification = useCallback((message, type = 'default') => {
    if (!message) return;
    switch (type) {
      case 'success':
        notify.success(message);
        break;
      case 'error':
        notify.error(message);
        break;
      case 'loading':
        notify.loading(message);
        break;
      default:
        notify.info(message);
    }
  }, []);

  const showSuccess = useCallback((msg) => showNotification(msg, 'success'), [showNotification]);
  const showError = useCallback((msg) => showNotification(msg, 'error'), [showNotification]);
  const showLoading = useCallback((msg) => showNotification(msg, 'loading'), [showNotification]);
  const showInfo = useCallback((msg) => showNotification(msg, 'default'), [showNotification]);
  const showWarning = useCallback((msg) => showNotification(msg, 'error'), [showNotification]);

  const dismiss = useCallback((toastId) => {
    notify.dismiss?.(toastId);
  }, []);

  return {
    showNotification,
    showSuccess,
    showError,
    showLoading,
    showInfo,
    showWarning,
    dismiss,
  };
}
