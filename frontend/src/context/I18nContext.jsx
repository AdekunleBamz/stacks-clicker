import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const translations = Object.freeze({
  en: {
    welcome: 'Welcome to Stacks Clicker V2',
    accessibility_mode: 'Accessibility Mode',
    interactions: 'Interactions',
    stats: 'Stats',
    recent_activity: 'Recent Activity',
    connect_wallet: 'Connect Wallet',
    disconnect: 'Disconnect',
    loading: 'Loading...',
    error: 'Something went wrong',
  },
  es: {
    welcome: 'Bienvenido a Stacks Clicker V2',
    accessibility_mode: 'Modo de Accesibilidad',
    interactions: 'Interacciones',
    stats: 'Estadísticas',
    recent_activity: 'Actividad Reciente',
    connect_wallet: 'Conectar Cartera',
    disconnect: 'Desconectar',
    loading: 'Cargando...',
    error: 'Algo salió mal',
  },
  fr: {
    welcome: 'Bienvenue sur Stacks Clicker V2',
    accessibility_mode: 'Mode d\'accessibilité',
    interactions: 'Interactions',
    stats: 'Statistiques',
    recent_activity: 'Activité Récente',
    connect_wallet: 'Connecter le Portefeuille',
    disconnect: 'Déconnecter',
    loading: 'Chargement...',
    error: 'Quelque chose a mal tourné',
  },
  pt: {
    welcome: 'Bem-vindo ao Stacks Clicker V2',
    accessibility_mode: 'Modo de Acessibilidade',
    interactions: 'Interações',
    stats: 'Estatísticas',
    recent_activity: 'Atividade Recente',
    connect_wallet: 'Conectar Carteira',
    disconnect: 'Desconectar',
    loading: 'Carregando...',
    error: 'Algo deu errado',
  },
  de: {
    welcome: 'Willkommen bei Stacks Clicker V2',
    accessibility_mode: 'Barrierefreiheitsmodus',
    interactions: 'Interaktionen',
    stats: 'Statistiken',
    recent_activity: 'Letzte Aktivität',
    connect_wallet: 'Wallet verbinden',
    disconnect: 'Trennen',
    loading: 'Wird geladen...',
    error: 'Etwas ist schiefgelaufen',
  },
});

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
      supportedLangs: Object.keys(translations),
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
