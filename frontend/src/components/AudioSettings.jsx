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
                    >
                        <div className="panel-header">
                            <h2>🔊 Audio Settings</h2>
                            <button className="close-btn" onClick={onClose}>✕</button>
                        </div>

                        <div className="settings-list">
                            <div className="setting-item">
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
                            </div>

                            <div className="setting-item toggle">
                                <span className="setting-label">Sound Effects</span>
                                <button
                                    className={`toggle-switch ${settings.sfxEnabled ? 'on' : 'off'}`}
                                    onClick={() => onUpdate('sfxEnabled', !settings.sfxEnabled)}
                                >
                                    <motion.div
                                        className="toggle-handle"
                                        animate={{ x: settings.sfxEnabled ? 20 : 0 }}
                                    />
                                </button>
                            </div>

                            <div className="setting-item toggle">
                                <span className="setting-label">Ambient Music</span>
                                <button
                                    className={`toggle-switch ${settings.musicEnabled ? 'on' : 'off'}`}
                                    onClick={() => onUpdate('musicEnabled', !settings.musicEnabled)}
                                >
                                    <motion.div
                                        className="toggle-handle"
                                        animate={{ x: settings.musicEnabled ? 20 : 0 }}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="panel-footer">
                            <button className="action-btn primary" onClick={onClose}>Done</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
