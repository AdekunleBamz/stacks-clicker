import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from '../ErrorBoundary';

describe('ErrorBoundary component', () => {
  const TestChild = ({ shouldThrow }) => {
    if (shouldThrow) {
      throw new Error('Test error');
    }
    return <div data-testid="child">Child Content</div>;
  };

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <TestChild shouldThrow={false} />
      </ErrorBoundary>
    );
    expect(screen.getByTestId('child')).toBeDefined();
    expect(screen.getByText('Child Content')).toBeDefined();
  });

  it('shows error UI when child throws', () => {
    render(
      <ErrorBoundary>
        <TestChild shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong')).toBeDefined();
    expect(screen.getByRole('alertdialog')).toBeDefined();
  });

  it('displays error message when available', () => {
    const ErrorThrower = () => {
      throw new Error('Custom error message');
    };

    render(
      <ErrorBoundary>
        <ErrorThrower />
      </ErrorBoundary>
    );
    expect(screen.getByText('Custom error message')).toBeDefined();
  });

  it('allows retry by resetting error state', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <TestChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeDefined();

    // Click "Try Again" button
    fireEvent.click(screen.getByText(/Try Again/i));

    // Re-render with non-throwing child
    rerender(
      <ErrorBoundary>
        <TestChild shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child')).toBeDefined();
  });
});
