/**
 * Detects if the current device is a mobile device using reliable methods
 * @returns {boolean} true if the device is mobile, false otherwise
 */
export const isMobileDevice = () => {
  // Method 1: Use the User-Agent string (still widely supported)
  const userAgent = navigator.userAgent;
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  
  // Method 2: Use window.matchMedia for a more modern approach (screen size based detection)
  const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
  
  // Method 3: Check touch capability (most mobile devices are touch-enabled)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Combine methods for better accuracy - if it matches the mobile regex OR
  // it has a small viewport AND touch capabilities
  return mobileRegex.test(userAgent) || (isMobileViewport && isTouchDevice);
};