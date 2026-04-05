import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from '../Header';
import { useWallet } from '../../context/WalletContext';
import { useI18n } from '../../context/I18nContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';

// Mock dependencies
vi.mock('../../context/WalletContext', () => ({
  useWallet: vi.fn(),
}));

vi.mock('../../context/I18nContext', () => ({
  useI18n: vi.fn(),
}));

vi.mock('../../hooks/useScrollPosition', () => ({
  useScrollPosition: vi.fn(),
}));

vi.mock('../NetworkLogo', () => ({
  default: () => <div data-testid="network-logo" />
}));

vi.mock('../common/AddressBadge', () => ({
  default: ({ address }) => <div data-testid="address-badge">{address}</div>
}));

describe('Header component', () => {
  beforeEach(() => {
    useWallet.mockReturnValue({
      address: null,
      connectWallet: vi.fn(),
      disconnectWallet: vi.fn(),
    });
    useI18n.mockReturnValue({
      lang: 'en',
      setLang: vi.fn(),
    });
    useScrollPosition.mockReturnValue({ y: 0 });
  });

  it('renders correctly in default state', () => {
    render(<Header theme="dark" toggleTheme={vi.fn()} />);
    expect(screen.getByText('Stacks Clicker')).toBeDefined();
    expect(screen.getByRole('banner')).toBeDefined();
    expect(screen.getByLabelText('Connect Stacks Wallet to begin playing')).toBeDefined();
  });

  it('shows address badge when wallet is connected', () => {
    useWallet.mockReturnValue({
      address: 'SP123...',
      disconnectWallet: vi.fn(),
    });
    render(<Header theme="dark" toggleTheme={vi.fn()} />);
    expect(screen.getByTestId('address-badge')).toBeDefined();
    expect(screen.getByLabelText('Disconnect wallet session')).toBeDefined();
  });

  it('triggers theme toggle when button is clicked', () => {
    const handleToggle = vi.fn();
    render(<Header theme="dark" toggleTheme={handleToggle} />);

    fireEvent.click(screen.getByLabelText(/Toggle to light theme/i));
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('changes class when scrolled', () => {
    useScrollPosition.mockReturnValue({ y: 100 });
    render(<Header theme="dark" toggleTheme={vi.fn()} />);
    expect(screen.getByRole('banner').className).toContain('header-scrolled');
  });

  it('has correct ARIA roles and labels for accessibility', () => {
    render(<Header theme="dark" toggleTheme={vi.fn()} />);
    expect(screen.getByRole('banner')).toHaveAttribute('role', 'banner');
    expect(screen.getByLabelText('Select application language')).toBeDefined();
  });
});
