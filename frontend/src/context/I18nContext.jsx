import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    welcome: "Welcome to Stacks Clicker V2",
    interactions: "Interactions",
    stats: "Stats",
    recent_activity: "Recent Activity",
    connect_wallet: "Connect Wallet",
    disconnect: "Disconnect"
  },
  es: {
    welcome: "Bienvenido a Stacks Clicker V2",
    interactions: "Interacciones",
    stats: "Estadísticas",
    recent_activity: "Actividad Reciente",
    connect_wallet: "Conectar Cartera",
    disconnect: "Desconectar"
  }
};

const I18nContext = createContext();

/**
 * Provider component for internationalization (i18n).
 * Manages language selection and provides a translation function.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to be wrapped.
 * @returns {JSX.Element} The I18nContext provider.
 */
export function I18nProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = (key) => translations[lang][key] || key;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
