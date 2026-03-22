import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const translations = {
  en: {
    welcome: 'Welcome to Stacks Clicker V2',
    interactions: 'Interactions',
    stats: 'Stats',
    recent_activity: 'Recent Activity',
    connect_wallet: 'Connect Wallet',
    disconnect: 'Disconnect',
  },
  es: {
    welcome: 'Bienvenido a Stacks Clicker V2',
    accessibility_mode: 'Modo de Accesibilidad',
    interactions: 'Interacciones',
    stats: 'Estadísticas',
    recent_activity: 'Actividad Reciente',
    connect_wallet: 'Conectar Cartera',
    disconnect: 'Desconectar',
  },
};

const I18nContext = createContext(null);

/**
 * Provider component for internationalization (i18n).
 * Manages language selection and provides a translation function.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to be wrapped.
 * @returns {JSX.Element} The I18nContext provider.
 */
export function I18nProvider({ children }) {
  const [lang, setLang] = useLocalStorage('lang', 'en');
  const activeLang = translations[lang] ? lang : 'en';
  const value = useMemo(
    () => ({
      lang: activeLang,
      setLang,
      t: (key) => translations[activeLang][key] ?? key,
    }),
    [activeLang, setLang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};
