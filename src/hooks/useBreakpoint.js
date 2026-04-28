import { useState, useEffect } from 'react';

export default function useBreakpoint() {
  const getBreakpoints = () => ({
    isMobile: window.innerWidth <= 768,
    isTablet: window.innerWidth <= 1024,
  });

  const [bp, setBp] = useState(getBreakpoints);

  useEffect(() => {
    const onResize = () => setBp(getBreakpoints());
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return bp;
}
