import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { WalletProvider } from './context/WalletContext.jsx';
import { I18nProvider } from './context/I18nContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './index.css';

/**
 * Entry point for the Stacks Clicker v2 Frontend.
 * Initializes the React root and wraps the application in essential global providers:
 * 1. React.StrictMode for non-legacy lifecycle checks
 * 2. ErrorBoundary for graceful failure UI
 * 3. I18nProvider for multi-language support (English, Yoruba, etc.)
 * 4. WalletProvider for Stacks/Hiro wallet connectivity
 */
const rootElement = document.getElementById('root');

if (rootElement) {
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
