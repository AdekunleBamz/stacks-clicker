import React from 'react';
import Modal from './common/Modal';
import { useModal } from '../context/ModalContext';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../context/I18nContext';
import { useSound } from '../hooks/useSound';

/**
 * Modal component for user settings and preferences.
 */
const SettingsModal = () => {
  const { isOpen, closeModal } = useModal();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang } = useI18n();
  const { playSound } = useSound();

  if (!isOpen('settings')) return null;

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    playSound('click');
  };

  return (
    <Modal
      isOpen={true}
      onClose={closeModal}
      title="⚙️ Application Settings"
    >
      <div className="settings-container">
        <section className="settings-section">
          <h4 className="settings-label">Appearance</h4>
          <div className="settings-row">
            <span>Theme Mode</span>
            <button 
              type="button"
              className="theme-toggle-btn secondary-button btn-sm"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </section>

        <section className="settings-section">
          <h4 className="settings-label">Localization</h4>
          <div className="settings-row">
            <span>Preferred Language</span>
            <select 
              className="lang-select-input input-field"
              aria-label="Preferred language"
              value={lang}
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </section>

        <section className="settings-section">
          <h4 className="settings-label">Acoustics</h4>
          <div className="settings-row">
            <span>Interaction Sounds</span>
            <div className="toggle-switch">
              {/* Simplified toggle for demonstration */}
              <button type="button" className="secondary-button btn-sm">Enabled</button>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .settings-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .settings-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .settings-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .settings-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
        }
      `}</style>
    </Modal>
  );
};

export default SettingsModal;
