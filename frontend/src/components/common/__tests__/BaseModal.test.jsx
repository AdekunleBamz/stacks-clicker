import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BaseModal from '../BaseModal';

describe('BaseModal component', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(
      <BaseModal isOpen={false} onClose={() => {}} title="Test Modal">
        <div>Content</div>
      </BaseModal>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders title and children when isOpen is true', () => {
    render(
      <BaseModal isOpen={true} onClose={() => {}} title="Test Modal">
        <div>Modal Content</div>
      </BaseModal>
    );
    expect(screen.getByText('Test Modal')).toBeDefined();
    expect(screen.getByText('Modal Content')).toBeDefined();
  });

  it('triggers onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <BaseModal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Content</div>
      </BaseModal>
    );

    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('triggers onClose when backdrop is clicked', () => {
    const handleClose = vi.fn();
    render(
      <BaseModal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Content</div>
      </BaseModal>
    );

    // The overlay is the first div with modal-overlay class
    const overlay = screen.getByRole('presentation');
    fireEvent.click(overlay);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onClose when modal content is clicked', () => {
    const handleClose = vi.fn();
    render(
      <BaseModal isOpen={true} onClose={handleClose} title="Test Modal">
        <div data-testid="content">Content</div>
      </BaseModal>
    );

    fireEvent.click(screen.getByTestId('content'));
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('closes on Escape key press', () => {
    const handleClose = vi.fn();
    render(
      <BaseModal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Content</div>
      </BaseModal>
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on Escape when onClose is not provided', () => {
    render(
      <BaseModal isOpen={true} onClose={null} title="Test Modal">
        <div>Content</div>
      </BaseModal>
    );

    // Should not throw when Escape is pressed
    fireEvent.keyDown(window, { key: 'Escape' });
  });

  it('renders with custom className when provided', () => {
    render(
      <BaseModal isOpen={true} onClose={() => {}} title="Test Modal" className="custom-modal">
        <div>Content</div>
      </BaseModal>
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('custom-modal');
  });
});
