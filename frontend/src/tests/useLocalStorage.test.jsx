import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useLocalStorage } from '../hooks/useLocalStorage';

function TestComponent() {
  const [value, setValue] = useLocalStorage('counter', { count: 0 });

  return (
    <div>
      <span data-testid="count">{value.count}</span>
      <button onClick={() => setValue((current) => ({ count: current.count + 1 }))}>
        Increment
      </button>
    </div>
  );
}

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it('supports functional updates without stale state', () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Increment'));
    fireEvent.click(screen.getByText('Increment'));

    expect(screen.getByTestId('count')).toHaveTextContent('2');
    expect(JSON.parse(window.localStorage.getItem('counter'))).toEqual({ count: 2 });
  });

  it('falls back to the initial value when a storage event removes the key', () => {
    render(<TestComponent />);

    window.dispatchEvent(new StorageEvent('storage', { key: 'counter', newValue: null }));

    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('ignores malformed storage event payloads', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(<TestComponent />);
    window.dispatchEvent(
      new StorageEvent('storage', { key: 'counter', newValue: '{invalid-json' })
    );

    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(warnSpy).toHaveBeenCalled();
  });
});
