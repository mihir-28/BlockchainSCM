document.addEventListener('DOMContentLoaded', () => {
  const startColor = getComputedStyle(document.documentElement).getPropertyValue('--color-cta').trim();
  const endColor = getComputedStyle(document.documentElement).getPropertyValue('--color-interactive').trim();

  function updateScrollbarColor() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = Math.max(0, Math.min(1, scrollTop / Math.max(1, scrollHeight)));

    // Interpolate between the two colors based on scroll percentage
    const currentColor = interpolateColor(startColor, endColor, scrollPercentage);

    document.documentElement.style.setProperty('--scrollbar-color-current', currentColor);
  }

  function interpolateColor(color1, color2, factor) {
    // Convert hex to RGB
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);

    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);

    // Calculate interpolated values
    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));

    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  // Update on scroll
  window.addEventListener('scroll', updateScrollbarColor);

  // Initial update
  updateScrollbarColor();
});