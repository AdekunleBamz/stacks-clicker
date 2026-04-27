import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SocialFeed from '../SocialFeed';

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }) => <>{children}</>,
  motion: {
    div: ({ children, whileHover, initial, animate, exit, transition, ...props }) => (
      <div {...props}>{children}</div>
    ),
    span: ({ children, initial, animate, exit, transition, ...props }) => (
      <span {...props}>{children}</span>
    ),
  },
}));

describe('SocialFeed', () => {
  it('marks reaction buttons as regular buttons', () => {
    render(
      <SocialFeed
        activities={[
          {
            id: '1',
            type: 'click',
            user: 'Ada',
            text: 'joined the streak',
            time: 'just now',
          },
        ]}
      />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('type', 'button');
    });
  }, 15000);
});
