import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { WalletProvider } from './context/WalletContext.jsx';
import { I18nProvider } from './context/I18nContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
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
