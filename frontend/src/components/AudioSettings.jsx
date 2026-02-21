import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AudioSettings Component
 * Control panel for game sounds and music
 */
export default function AudioSettings({ isOpen, onClose, settings, onUpdate }) {
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
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="audio-settings-title"
                    >
                        <div className="panel-header">
                            <h2 id="audio-settings-title">🔊 Audio Settings</h2>
                            <button
                                className="close-btn"
                                onClick={onClose}
                                aria-label="Close settings"
                            >
                                ✕
                            </button>
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
                                    aria-label="Master Volume Slider"
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
                                    aria-label={`Toggle Sound Effects: ${settings.sfxEnabled ? 'On' : 'Off'}`}
                                    aria-pressed={settings.sfxEnabled}
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
                                    aria-label={`Toggle Ambient Music: ${settings.musicEnabled ? 'On' : 'Off'}`}
                                    aria-pressed={settings.musicEnabled}
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
                                onClick={() => soundEngine.play('click')}
                                style={{ marginRight: '1rem' }}
                            >
                                Test Sound 🔊
                            </motion.button>
                            <button className="action-btn primary" onClick={onClose}>Done</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
