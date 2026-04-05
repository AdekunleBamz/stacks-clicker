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
    isCritical: false,
    supported: true,
  });

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('getBattery' in navigator)) {
      setBattery((prev) => ({ ...prev, supported: false }));
      return;
    }

    let batteryInstance = null;
    let handleChange = null;
    let cancelled = false;

    function updateBattery(batt) {
      setBattery({
        level: batt.level,
        charging: batt.charging,
        isLowBattery: batt.level <= 0.2 && !batt.charging,
        isCritical: batt.level <= 0.05 && !batt.charging,
        supported: true,
      });
    }

    navigator.getBattery().then((batt) => {
      if (cancelled) return;
      batteryInstance = batt;

      const handleChange = () => updateBattery(batt);

      batteryInstance.addEventListener('levelchange', handleChange);
      batteryInstance.addEventListener('chargingchange', handleChange);

      updateBattery(batt);

      updateBattery(batt);
    });

    return () => {
      cancelled = true;
      if (batteryInstance && handleChange) {
        batteryInstance.removeEventListener('levelchange', handleChange);
        batteryInstance.removeEventListener('chargingchange', handleChange);
      }
    };
  }, []);

  return battery;
}
