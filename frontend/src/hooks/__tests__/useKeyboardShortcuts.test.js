import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useKeyboardShortcuts } from '../useKeyboardShortcuts';

describe('useKeyboardShortcuts hook', () => {
  it('triggers the click action and sound for the c shortcut', () => {
    const click = vi.fn();
    const playSound = vi.fn();

    renderHook(() =>
      useKeyboardShortcuts({
        isEnabled: true,
        actions: { click },
        playSound,
      })
    );

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'c' }));

    expect(playSound).toHaveBeenCalledWith('click');
    expect(click).toHaveBeenCalledTimes(1);
  });
});
