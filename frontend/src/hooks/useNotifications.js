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
      case 'warning':
        notify.warning?.(message) ?? notify.error(message);
        break;
      default:
        notify.info(message);
    }
  }, []);

  const showSuccess = useCallback((msg) => showNotification(msg, 'success'), [showNotification]);
  const showError = useCallback((msg) => showNotification(msg, 'error'), [showNotification]);
  const showLoading = useCallback((msg) => showNotification(msg, 'loading'), [showNotification]);
  const showInfo = useCallback((msg) => showNotification(msg, 'default'), [showNotification]);
  const showWarning = useCallback((msg) => showNotification(msg, 'warning'), [showNotification]);

  const dismiss = useCallback((toastId) => {
    notify.dismiss?.(toastId);
  }, []);

  const showPromise = useCallback((promise, { loading, success, error } = {}) => {
    if (loading) notify.loading(loading);
    return Promise.resolve(promise)
      .then((result) => { if (success) notify.success(success); return result; })
      .catch((err) => { if (error) notify.error(typeof error === 'function' ? error(err) : error); throw err; });
  }, []);

  return {
    showNotification,
    showSuccess,
    showError,
    showLoading,
    showInfo,
    showWarning,
    dismiss,
    showPromise,
  };
}
