import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking the user's battery status.
 * Useful for adaptive performance and power-saving modes.
 *
 * @returns {Object} { level, charging, isLowBattery, supported }
 */
export function useBattery() {
  const [battery, setBattery] = useState({
    level: 1,
    charging: true,
    isLowBattery: false,
    supported: true,
  });

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('getBattery' in navigator)) {
      setBattery((prev) => ({ ...prev, supported: false }));
      return;
    }

    let batteryInstance = null;

    function updateBattery(batt) {
      setBattery({
        level: batt.level,
        charging: batt.charging,
        isLowBattery: batt.level <= 0.2 && !batt.charging,
        supported: true,
      });
    }

    navigator.getBattery().then((batt) => {
      batteryInstance = batt;

      const handleChange = () => updateBattery(batt);

      batteryInstance.addEventListener('levelchange', handleChange);
      batteryInstance.addEventListener('chargingchange', handleChange);

      updateBattery(batt);

      return () => {
        batt.removeEventListener('levelchange', handleChange);
        batt.removeEventListener('chargingchange', handleChange);
      };
    });

    return () => {
      if (batteryInstance) {
        // handlers were attached in the then callback; cleanup handled there
      }
    };
  }, []);

  return battery;
}
