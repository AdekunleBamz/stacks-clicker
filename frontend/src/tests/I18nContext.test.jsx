import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { I18nProvider, useI18n } from '../context/I18nContext';

function TestComponent() {
  const { lang, setLang, t } = useI18n();

  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="message">{t('welcome')}</span>
      <button onClick={() => setLang('es')}>Switch</button>
    </div>
  );
}

describe('I18nContext', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('defaults to English when nothing is stored', () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    expect(screen.getByTestId('message')).toHaveTextContent('Welcome to Stacks Clicker V2');
  });

  it('persists language changes', () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    fireEvent.click(screen.getByText('Switch'));

    expect(screen.getByTestId('lang')).toHaveTextContent('es');
    expect(window.localStorage.getItem('lang')).toBe('"es"');
  });

  it('falls back to English for unsupported stored values', () => {
    window.localStorage.setItem('lang', JSON.stringify('fr'));

    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    expect(screen.getByTestId('message')).toHaveTextContent('Welcome to Stacks Clicker V2');
  });
});
