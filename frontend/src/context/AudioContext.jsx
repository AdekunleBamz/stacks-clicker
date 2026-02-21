import React, { createContext, useContext, useState, useEffect } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('audio-settings');
        return saved ? JSON.parse(saved) : {
            masterVolume: 0.5,
            sfxEnabled: true,
            musicEnabled: false
        };
    });

    useEffect(() => {
        localStorage.setItem('audio-settings', JSON.stringify(settings));
    }, [settings]);

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <AudioContext.Provider value={{ settings, updateSetting }}>
            {children}
        </AudioContext.Provider>
    );
}

export const useAudio = () => useContext(AudioContext);
