import { useState, useEffect } from 'react';

const useDeviceMotion = () => {
  const [motion, setMotion] = useState({ x: 0, y: 0, z: 0 });
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if device motion is supported
    const hasMotion = 'DeviceMotionEvent' in window;
    const hasOrientation = 'DeviceOrientationEvent' in window;
    setIsSupported(hasMotion || hasOrientation);

    const handleMotion = (event) => {
      const { accelerationIncludingGravity } = event;
      if (accelerationIncludingGravity) {
        setMotion({
          x: accelerationIncludingGravity.x || 0,
          y: accelerationIncludingGravity.y || 0,
          z: accelerationIncludingGravity.z || 0,
        });
      }
    };

    const handleOrientation = (event) => {
      setOrientation({
        alpha: event.alpha || 0, // Z axis (0-360)
        beta: event.beta || 0,   // X axis (-180 to 180)
        gamma: event.gamma || 0, // Y axis (-90 to 90)
      });
    };

    // Request permission for iOS 13+
    const requestPermission = async () => {
      if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceMotionEvent.requestPermission();
          if (permission === 'granted') {
            window.addEventListener('devicemotion', handleMotion);
          }
        } catch (error) {
          console.log('Device motion permission denied');
        }
      } else {
        window.addEventListener('devicemotion', handleMotion);
      }

      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } catch (error) {
          console.log('Device orientation permission denied');
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // Normalize values for easier use (-1 to 1 range)
  const normalizedTilt = {
    x: Math.max(-1, Math.min(1, (orientation.gamma || 0) / 45)),
    y: Math.max(-1, Math.min(1, (orientation.beta || 0) / 45)),
  };

  return {
    motion,
    orientation,
    tilt: normalizedTilt,
    isSupported,
  };
};

export default useDeviceMotion;
