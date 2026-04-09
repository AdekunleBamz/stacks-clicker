import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TransactionHistory from '../TransactionHistory';

// Mock child components to isolate TransactionHistory logic
vi.mock('../TransactionItem', () => ({
  default: React.forwardRef(function MockTransactionItem({ tx }, ref) {
    return <div ref={ref} data-testid="tx-item">{tx.action}</div>;
  })
}));

vi.mock('../common/SearchInput', () => ({
  default: ({ value, onChange }) => (
    <input
      data-testid="search-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}));

vi.mock('../../hooks/useDebounce', () => ({
  useDebounce: (value) => value,
}));

describe('TransactionHistory component', () => {
  const mockTxLog = [
    { id: '1', action: 'Click', status: 'success', time: Date.now() },
    { id: '2', action: 'Tip', status: 'pending', time: Date.now() - 1000 },
    { id: '3', action: 'Vote', status: 'failed', time: Date.now() - 2000 },
  ];

  it('renders progress bar or list items correctly', () => {
    render(<TransactionHistory txLog={mockTxLog} />);
    expect(screen.getAllByTestId('tx-item')).toHaveLength(3);
  });

  it('filters items based on search term', async () => {
    render(<TransactionHistory txLog={mockTxLog} />);
    const searchInput = screen.getByTestId('search-input');

    // Search for "Click"
    fireEvent.change(searchInput, { target: { value: 'Click' } });

    // We expect 1 item because filtering happens after debounce (mocked or small delay)
    // In this test, we might need to wait if useDebounce is real.
    // If useDebounce is mocked to return immediately:
    expect(screen.getAllByTestId('tx-item')).toHaveLength(1);
    expect(screen.getByText('Click')).toBeDefined();
  });

  it('shows empty state when no transactions match filter', () => {
    render(<TransactionHistory txLog={mockTxLog} />);
    const searchInput = screen.getByTestId('search-input');

    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } });

    // After filtering, no items should be displayed
    expect(screen.queryAllByTestId('tx-item')).toHaveLength(0);
  });

  it('renders empty list when txLog is empty', () => {
    render(<TransactionHistory txLog={[]} />);
    expect(screen.queryAllByTestId('tx-item')).toHaveLength(0);
  });

  it('handles case-insensitive search', () => {
    render(<TransactionHistory txLog={mockTxLog} />);
    const searchInput = screen.getByTestId('search-input');

    fireEvent.change(searchInput, { target: { value: 'click' } });

    expect(screen.getAllByTestId('tx-item')).toHaveLength(1);
  });
});
