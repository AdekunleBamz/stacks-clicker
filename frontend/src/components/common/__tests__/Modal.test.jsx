import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Modal from '../Modal';

describe('Modal', () => {
  it('renders content when open', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test modal">
        <p>Modal body</p>
      </Modal>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test modal')).toBeInTheDocument();
    expect(screen.getByText('Modal body')).toBeInTheDocument();
  });

  it('closes when the close button is clicked', () => {
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={onClose} title="Test modal">
        <p>Modal body</p>
      </Modal>
    );

    fireEvent.click(screen.getByRole('button', { name: /close modal/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
