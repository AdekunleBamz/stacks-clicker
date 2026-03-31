import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { WalletProvider } from './context/WalletContext.jsx';
import { I18nProvider } from './context/I18nContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './index.css';

/**
 * Entry point for the Stacks Clicker frontend.
 * Initializes the React root and wraps the application in essential global providers:
 * 1. React.StrictMode for non-legacy lifecycle checks
 * 2. ErrorBoundary for graceful failure UI
 * 3. I18nProvider for multi-language support (English, Yoruba, etc.)
 * 4. WalletProvider for Stacks/Hiro wallet connectivity
 *
 * @see {@link https://react.dev/reference/react-dom/client/createRoot React DOM Client}
 */
const rootElement = document.getElementById('root');

if (rootElement) {
  document.documentElement.lang = document.documentElement.lang || 'en';
  document.documentElement.dir = 'ltr';
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <I18nProvider>
          <WalletProvider>
            <App />
          </WalletProvider>
        </I18nProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
