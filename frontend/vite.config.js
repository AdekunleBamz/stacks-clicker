import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'walletconnect-vendor': ['@walletconnect/universal-provider', '@walletconnect/sign-client'],
          'framer-vendor': ['framer-motion'],
          'reown-vendor': ['@reown/appkit'],
          'stacks-vendor': ['@stacks/connect', '@stacks/network', '@stacks/transactions'],
        },
      },
    },
  },
});
