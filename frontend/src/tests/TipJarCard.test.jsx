import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TipJarCard from '../components/TipJarCard';

vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_, tag) =>
        React.forwardRef(
          (
            {
              children,
              animate,
              exit,
              initial,
              transition,
              variants,
              viewport,
              whileDrag,
              whileHover,
              whileInView,
              whileTap,
              ...props
            },
            ref
          ) => React.createElement(tag, { ...props, ref }, children)
        ),
    }
  ),
  AnimatePresence: ({ children }) => <>{children}</>,
}));

vi.mock('../hooks/useSound', () => ({
  useSound: () => ({ playSound: vi.fn() }),
}));

describe('TipJarCard Component', () => {
  const tip = vi.fn();
  const handleSelfPing = vi.fn();
  const isLoading = vi.fn().mockReturnValue(false);

  const renderCard = (address = 'SP123ABCD') =>
    render(<TipJarCard address={address} tipjar={{ tip, handleSelfPing, isLoading }} />);

  beforeEach(() => {
    vi.clearAllMocks();
    isLoading.mockReturnValue(false);
  });

  it('renders the current card copy', () => {
    renderCard();

    expect(screen.getByText('💰 TipJar')).toBeInTheDocument();
    expect(screen.getByText('Send tips to generate transactions.')).toBeInTheDocument();
  });

  it('invokes the fixed tip actions', () => {
    renderCard();

    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);

    expect(handleSelfPing).toHaveBeenCalledTimes(1);
    expect(tip).toHaveBeenCalledTimes(1);
    expect(tip).toHaveBeenCalledWith(0.001);
  });

  it('submits a valid custom tip amount', () => {
    renderCard();

    fireEvent.change(screen.getByLabelText(/custom amount/i), {
      target: { value: '0.05' },
    });
    fireEvent.click(screen.getAllByRole('button')[2]);

    expect(tip).toHaveBeenCalledWith(0.05);
    expect(screen.getByText('0.051 STX')).toBeInTheDocument();
  });

  it('blocks invalid custom amounts', () => {
    renderCard();

    fireEvent.change(screen.getByLabelText(/custom amount/i), {
      target: { value: '0' },
    });
    fireEvent.click(screen.getAllByRole('button')[2]);

    expect(tip).not.toHaveBeenCalled();
    expect(screen.getByText('Invalid amount')).toBeInTheDocument();
  });

  it('prevents actions when disconnected', () => {
    renderCard(null);

    fireEvent.click(screen.getAllByRole('button')[1]);

    expect(tip).not.toHaveBeenCalled();
    expect(handleSelfPing).not.toHaveBeenCalled();
  });
});
