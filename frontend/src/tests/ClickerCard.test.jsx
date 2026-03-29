import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ClickerCard from '../components/ClickerCard';

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

describe('ClickerCard Component', () => {
  const click = vi.fn();
  const multiClick = vi.fn();
  const ping = vi.fn();
  const isLoading = vi.fn().mockReturnValue(false);

  const renderCard = (address = 'SP123ABCD') =>
    render(<ClickerCard address={address} clicker={{ click, multiClick, ping, isLoading }} />);

  beforeEach(() => {
    vi.clearAllMocks();
    isLoading.mockReturnValue(false);
  });

  it('renders the current card copy', () => {
    renderCard();

    expect(screen.getByText('🎯 Power Clicker')).toBeInTheDocument();
    expect(screen.getByText('Click to generate on-chain activity.')).toBeInTheDocument();
  });

  it('renders the three action buttons', () => {
    renderCard();

    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('prevents actions when no address is available', () => {
    renderCard(null);

    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(click).not.toHaveBeenCalled();
  });

  it('calls click actions with the expected payloads', () => {
    renderCard();

    fireEvent.click(screen.getByRole('button', { name: /express click/i }));
    fireEvent.click(screen.getByRole('button', { name: /turbo 10x/i }));
    fireEvent.click(screen.getByRole('button', { name: /network ping/i }));

    expect(click).toHaveBeenCalledTimes(1);
    expect(multiClick).toHaveBeenCalledTimes(1);
    expect(multiClick).toHaveBeenCalledWith(10);
    expect(ping).toHaveBeenCalledTimes(1);
  });
});
