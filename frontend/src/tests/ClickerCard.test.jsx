import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ClickerCard from '../components/ClickerCard';

describe('ClickerCard Component', () => {
  const defaultProps = {
    address: 'SP123ABCD',
    isLoading: vi.fn().mockReturnValue(false),
    handleClick: vi.fn(),
    handleMultiClick: vi.fn(),
    handlePing: vi.fn(),
  };

  it('renders the contract title and subtitle', () => {
    render(<ClickerCard {...defaultProps} />);
    expect(screen.getByText('Clicker')).toBeInTheDocument();
    expect(screen.getByText('Click to generate transactions')).toBeInTheDocument();
  });

  it('renders three action buttons', () => {
    render(<ClickerCard {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  it('disables buttons when address is null', () => {
    render(<ClickerCard {...defaultProps} address={null} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it('enables buttons when address is provided', () => {
    render(<ClickerCard {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).not.toBeDisabled();
    });
  });

  it('calls handleClick when first button is clicked', () => {
    render(<ClickerCard {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    buttons[0].click();
    expect(defaultProps.handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls handleMultiClick when second button is clicked', () => {
    render(<ClickerCard {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    buttons[1].click();
    expect(defaultProps.handleMultiClick).toHaveBeenCalledTimes(1);
  });

  it('calls handlePing when third button is clicked', () => {
    render(<ClickerCard {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    buttons[2].click();
    expect(defaultProps.handlePing).toHaveBeenCalledTimes(1);
  });
});
