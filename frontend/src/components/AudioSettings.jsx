import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { useSound } from '../hooks/useSound';

/**
 * AudioSettings Component
 * Control panel for game sounds and music
 */
export default function AudioSettings({ isOpen, onClose, settings, onUpdate }) {
    const { playSound } = useSound();
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="audio-settings-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="audio-settings-panel"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="panel-header">
                            <h2><span aria-hidden="true">🔊</span> Audio Settings</h2>
                            <button type="button" className="close-btn" onClick={onClose} aria-label="Close audio settings"><span aria-hidden="true">✕</span></button>
                        </div>

                        <div className="settings-list">
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="setting-item"
                            >
                                <div className="setting-info">
                                    <span className="setting-label">Master Volume</span>
                                    <span className="setting-value">{Math.round(settings.masterVolume * 100)}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={settings.masterVolume}
                                    onChange={(e) => onUpdate('masterVolume', parseFloat(e.target.value))}
                                    className="volume-slider"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="setting-item toggle"
                            >
                                <span className="setting-label">Sound Effects</span>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`toggle-switch ${settings.sfxEnabled ? 'on' : 'off'}`}
                                    onClick={() => onUpdate('sfxEnabled', !settings.sfxEnabled)}
                                    type="button"
                                    aria-pressed={settings.sfxEnabled}
                                    aria-label="Toggle sound effects"
                                >
                                    <motion.div
                                        className="toggle-handle"
                                        animate={{ x: settings.sfxEnabled ? 20 : 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                </motion.button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="setting-item toggle"
                            >
                                <span className="setting-label">Ambient Music</span>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`toggle-switch ${settings.musicEnabled ? 'on' : 'off'}`}
                                    onClick={() => onUpdate('musicEnabled', !settings.musicEnabled)}
                                    type="button"
                                    aria-pressed={settings.musicEnabled}
                                    aria-label="Toggle ambient music"
                                >
                                    <motion.div
                                        className="toggle-handle"
                                        animate={{ x: settings.musicEnabled ? 20 : 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                </motion.button>
                            </motion.div>
                        </div>

                        <div className="panel-footer">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="action-btn secondary"
                                onClick={() => playSound('click')}
                                style={{ marginRight: '1rem' }}
                                type="button"
                                aria-label="Test sound preview"
                            >
                                Test Sound <span aria-hidden="true">🔊</span>
                            </motion.button>
                            <button type="button" className="action-btn primary" onClick={onClose}>Done</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

AudioSettings.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    settings: PropTypes.shape({
        masterVolume: PropTypes.number,
        sfxEnabled: PropTypes.bool,
        musicEnabled: PropTypes.bool,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
};
