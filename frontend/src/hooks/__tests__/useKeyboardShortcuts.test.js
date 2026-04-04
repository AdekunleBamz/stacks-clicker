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

  it('ignores repeated keydown events for the same shortcut', () => {
    const click = vi.fn();
    const playSound = vi.fn();

    renderHook(() =>
      useKeyboardShortcuts({
        isEnabled: true,
        actions: { click },
        playSound,
      })
    );

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'c', repeat: true }));

    expect(playSound).not.toHaveBeenCalled();
    expect(click).not.toHaveBeenCalled();
  });

  it('does not fire shortcuts while a select element is focused', () => {
    const click = vi.fn();
    const playSound = vi.fn();
    const select = document.createElement('select');
    document.body.appendChild(select);
    select.focus();

    renderHook(() =>
      useKeyboardShortcuts({
        isEnabled: true,
        actions: { click },
        playSound,
      })
    );

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'c' }));

    expect(playSound).not.toHaveBeenCalled();
    expect(click).not.toHaveBeenCalled();

    document.body.removeChild(select);
  });

  it('prevents the default browser action for handled shortcuts', () => {
    const click = vi.fn();
    const playSound = vi.fn();

    renderHook(() =>
      useKeyboardShortcuts({
        isEnabled: true,
        actions: { click },
        playSound,
      })
    );

    const event = new KeyboardEvent('keydown', { key: 'c', cancelable: true });
    const preventDefault = vi.spyOn(event, 'preventDefault');
    window.dispatchEvent(event);

    expect(preventDefault).toHaveBeenCalledTimes(1);
  });
});
