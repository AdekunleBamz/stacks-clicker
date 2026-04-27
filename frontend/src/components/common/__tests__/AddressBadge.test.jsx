import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AddressBadge from '../AddressBadge';

describe('AddressBadge', () => {
  it('marks the disconnect button as a regular button', () => {
    const onDisconnect = vi.fn();

    render(<AddressBadge address="SP1234567890ABCDE12345" onDisconnect={onDisconnect} />);

    const button = screen.getByRole('button', { name: /disconnect wallet/i });
    expect(button).toHaveAttribute('type', 'button');

    fireEvent.click(button);
    expect(onDisconnect).toHaveBeenCalledTimes(1);
  });
});
