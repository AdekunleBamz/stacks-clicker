import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ActionButton from '../ActionButton';

describe('ActionButton component', () => {
  it('renders correctly with label and icon', () => {
    render(<ActionButton label="Click Me" icon="🎯" onClick={() => {}} />);
    expect(screen.getByText('Click Me')).toBeDefined();
    expect(screen.getByText('🎯')).toBeDefined();
  });

  it('triggers onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<ActionButton label="Click Me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<ActionButton label="Click Me" onClick={() => {}} disabled />);
    const button = screen.getByRole('button');
    expect(button.closest('button')).toBeDisabled();
  });

  it('is disabled and shows loading state when isLoading is true', () => {
    render(<ActionButton label="Click Me" onClick={() => {}} isLoading />);
    const button = screen.getByRole('button');
    expect(button.closest('button')).toBeDisabled();
    expect(screen.getByRole('progressbar')).toBeDefined();
  });

  it('displays cost when provided', () => {
    render(<ActionButton label="Buy" onClick={() => {}} cost="1.00 STX" />);
    expect(screen.getByText('1.00 STX')).toBeDefined();
  });

  it('has correct aria-label containing label and cost', () => {
    render(<ActionButton label="Buy" onClick={() => {}} cost="1.00 STX" />);
    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-label')).toBe('Buy - Cost: 1.00 STX');
  });
});
