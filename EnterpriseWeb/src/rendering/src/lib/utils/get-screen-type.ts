export type ScreenTypes = 'sm' | 'md' | 'ml' | 'lg' | 'xl';

export type ScreenSizeProps = {
  screenType: ScreenTypes | null;
  currentScreenWidth: number;
};

const breakpoints: Record<ScreenTypes, number> = {
  sm: 375,
  md: 672,
  ml: 960,
  lg: 1200,
  xl: 1440,
};

import { useState, useEffect } from 'react';

export function useCurrentScreenType() {
  const [screenType, setScreenType] = useState<ScreenSizeProps>({
    screenType: null,
    currentScreenWidth: 1200,
  });

  useEffect(() => {
    function handleResize() {
      setScreenType(getScreenType(window.innerWidth));
    }

    window.addEventListener('resize', handleResize);

    // Get screen type on first load
    setScreenType(getScreenType(window.innerWidth));

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenType;
}

export const getScreenType = (currentScreenWidth: number): ScreenSizeProps => {
  if (currentScreenWidth >= 1440) {
    return { screenType: 'xl', currentScreenWidth };
  } else if (currentScreenWidth >= 1200) {
    return { screenType: 'lg', currentScreenWidth };
  } else if (currentScreenWidth >= 960) {
    return { screenType: 'ml', currentScreenWidth };
  } else if (currentScreenWidth >= 672) {
    return { screenType: 'md', currentScreenWidth };
  } else {
    return { screenType: 'sm', currentScreenWidth };
  }
};

export const getBreakpoint = (screenType: ScreenTypes) => {
  return breakpoints[screenType];
};
