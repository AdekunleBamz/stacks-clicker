import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TipJarCard from '../components/TipJarCard';

describe('TipJarCard Component', () => {
  const defaultProps = {
    address: 'SP123ABCD',
    isLoading: vi.fn().mockReturnValue(false),
    tipAmount: '0.001',
    setTipAmount: vi.fn(),
    handleSelfPing: vi.fn(),
    handleQuickTip: vi.fn(),
    handleCustomTip: vi.fn(),
  };

  it('renders the contract title and subtitle', () => {
    render(<TipJarCard {...defaultProps} />);
    expect(screen.getByText('TipJar')).toBeInTheDocument();
    expect(screen.getByText('Send tips to generate transactions')).toBeInTheDocument();
  });

  it('renders three action buttons', () => {
    render(<TipJarCard {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  it('disables all buttons when no address is provided', () => {
    render(<TipJarCard {...defaultProps} address={null} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it('calls handleSelfPing when first button is clicked', () => {
    render(<TipJarCard {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    buttons[0].click();
    expect(defaultProps.handleSelfPing).toHaveBeenCalledTimes(1);
  });

  it('calls handleQuickTip when second button is clicked', () => {
    render(<TipJarCard {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    buttons[1].click();
    expect(defaultProps.handleQuickTip).toHaveBeenCalledTimes(1);
  });

  it('calls handleCustomTip when third button is clicked', () => {
    render(<TipJarCard {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    buttons[2].click();
    expect(defaultProps.handleCustomTip).toHaveBeenCalledTimes(1);
  });

  it('displays the tip amount correctly in the cost label', () => {
    render(<TipJarCard {...defaultProps} tipAmount="0.05" />);
    // 0.05 + 0.001 = 0.051
    expect(screen.getByText('0.051 STX')).toBeInTheDocument();
  });
});
