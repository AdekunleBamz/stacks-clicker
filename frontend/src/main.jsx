import React from 'react'
import ReactDOM from 'react-dom/client'
import { WalletProvider } from './context/WalletContext';
import { AudioProvider } from './context/AudioContext';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AudioProvider>
      <WalletProvider>
        <App />
      </WalletProvider>
    </AudioProvider>
  </React.StrictMode>,
)
