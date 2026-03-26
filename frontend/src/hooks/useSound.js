import { useCallback } from 'react';

let compressor = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;

  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) return null;

  if (!audioContext || audioContext.state === 'closed') {
    audioContext = new AudioContextCtor();
    
    // Create a master compressor to prevent clipping during overlapping sounds
    compressor = audioContext.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-24, audioContext.currentTime);
    compressor.knee.setValueAtTime(40, audioContext.currentTime);
    compressor.ratio.setValueAtTime(12, audioContext.currentTime);
    compressor.attack.setValueAtTime(0, audioContext.currentTime);
    compressor.release.setValueAtTime(0.25, audioContext.currentTime);
    compressor.connect(audioContext.destination);
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume().catch(() => {});
  }

  return { ctx: audioContext, destination: compressor };
}

/**
 * Custom hook for synthesized acoustic feedback using the Web Audio API.
 * Generates dynamic waveforms (sine, triangle, sawtooth) without requiring external audio assets,
 * ensuring zero latency and zero bundle overhead for sound effects.
 *
 * @returns {Object} { playSound }
 * @property {Function} playSound - Function to trigger a sound effect: (type: 'click' | 'success' | 'error') => void
 */
export function useSound() {
  /**
   * Triggers a specific synthesized sound effect.
   * @param {'click'|'success'|'error'} type - The category of sound to play
   */
  const playSound = useCallback((type) => {
    // Graceful acoustic degraded safety fallback for rigid browser autoplay policies
    if (!['click', 'success', 'error', 'hover'].includes(type)) {
      return;
    }

    const { ctx, destination } = getAudioContext() || {};
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(destination);

    const now = ctx.currentTime;

    // Synthesize different waveforms based on the required feedback type
    switch (type) {
      case 'hover':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      case 'click':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      case 'success':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
        break;
      case 'error':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(50, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      default:
        osc.disconnect();
        gain.disconnect();
        return;
    }
  }, []);

  return { playSound };
}
