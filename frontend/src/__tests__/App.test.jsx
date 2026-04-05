import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock all complex hooks used in App.jsx
vi.mock('../context/WalletContext', () => ({
  useWallet: () => ({ address: null }),
}));

vi.mock('../context/I18nContext', () => ({
  useI18n: () => ({ lang: 'en', setLang: vi.fn() }),
}));

vi.mock('../hooks/useSound', () => ({
  useSound: () => ({ playSound: vi.fn() }),
}));

vi.mock('../hooks/useTheme', () => ({
  useTheme: () => ({ theme: 'dark', toggleTheme: vi.fn() }),
}));

vi.mock('../hooks/useTransactionHistory', () => ({
  useTransactionHistory: () => ({
    txLog: [],
    addTxToLog: vi.fn(),
    setTxLog: vi.fn(),
    clearLog: vi.fn(),
  }),
}));

vi.mock('../hooks/useInteractions', () => ({
  useInteractions: () => ({
    clicker: { click: vi.fn(), multiClick: vi.fn() },
    tipjar: { tip: vi.fn(), withdraw: vi.fn() },
    quickpoll: { vote: vi.fn() },
    pingAll: vi.fn(),
  }),
}));

vi.mock('../hooks/useMilestones', () => ({
  useMilestones: () => ({ celebration: null }),
}));

vi.mock('../hooks/useDocumentTitle', () => ({
  useDocumentTitle: vi.fn(),
}));

vi.mock('../hooks/useKeydown', () => ({
  useKeydown: vi.fn(),
}));

vi.mock('../hooks/useBattery', () => ({
  useBattery: () => ({ isLowBattery: false }),
}));

vi.mock('../hooks/useNetworkStatus', () => ({
  useNetworkStatus: () => true,
}));

vi.mock('../hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => false,
}));

vi.mock('../hooks/useKeyboardShortcuts', () => ({
  useKeyboardShortcuts: vi.fn(),
}));

// Mock lazy-loaded components to avoid Suspense issues in simple smoke tests
vi.mock('../components/MainGrid', () => ({ default: () => <div data-testid="main-grid" /> }));
vi.mock('../components/PlayerStats', () => ({ default: () => <div data-testid="player-stats" /> }));
vi.mock('../components/TransactionHistory', () => ({ default: () => <div data-testid="tx-history" /> }));
vi.mock('../components/Header', () => ({ default: () => <header data-testid="header" /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer data-testid="footer" /> }));

describe('App Smoke Test', () => {
  it('renders the core application structure without crashing', () => {
    render(<App />);

    // Check for main structural elements
    expect(screen.getByRole('application')).toBeDefined();
    expect(screen.getByTestId('header')).toBeDefined();
    expect(screen.getByTestId('footer')).toBeDefined();
    expect(screen.getByRole('main')).toBeDefined();
  });

  it('contains the accessibility skip link', () => {
    render(<App />);
    const skipLink = screen.getByText(/Skip to main content/i);
    expect(skipLink).toBeDefined();
    expect(skipLink.getAttribute('href')).toBe('#main-content');
  });
});
