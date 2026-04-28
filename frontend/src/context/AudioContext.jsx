import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AudioContext = createContext();

export function AudioProvider({ children }) {
    const [settings, setSettings] = useState(() => {
        try {
            const saved = localStorage.getItem('audio-settings');
            return saved ? JSON.parse(saved) : {
                masterVolume: 0.5,
                sfxEnabled: true,
                musicEnabled: false
            };
        } catch {
            return { masterVolume: 0.5, sfxEnabled: true, musicEnabled: false };
        }
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

AudioProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within AudioProvider');
    }
    return context;
};
