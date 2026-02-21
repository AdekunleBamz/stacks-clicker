/**
 * SoundEngine Utility
 * Handles playback of game sound effects
 */
class SoundEngine {
    constructor() {
        this.sounds = {};
        this.masterVolume = 0.5;
        this.sfxEnabled = true;
    }

    setSettings(settings) {
        this.masterVolume = settings.masterVolume;
        this.sfxEnabled = settings.sfxEnabled;
    }

    loadSound(name, url) {
        const audio = new Audio(url);
        audio.preload = 'auto';
        this.sounds[name] = audio;
    }

    play(name) {
        if (!this.sfxEnabled || !this.sounds[name]) return;

        // Create a clone to allow overlapping sounds
        const sound = this.sounds[name].cloneNode();
        sound.volume = this.masterVolume;
        sound.play().catch(e => console.warn('Audio playback failed:', e));
    }
}

const engine = new SoundEngine();

// Preload sounds
// In a production environment, these would be local assets in /public/sounds/
const SOUND_ASSETS = {
    click: 'https://assets.mixkit.co/sfx/preview/mixkit-modern-technology-select-3118.mp3',
    success: 'https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3',
    levelUp: 'https://assets.mixkit.co/sfx/preview/mixkit-magic-marimba-notifaction-2231.mp3',
    error: 'https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3'
};

Object.entries(SOUND_ASSETS).forEach(([name, url]) => {
    engine.loadSound(name, url);
});

export default engine;
export { engine as SoundEngine };
