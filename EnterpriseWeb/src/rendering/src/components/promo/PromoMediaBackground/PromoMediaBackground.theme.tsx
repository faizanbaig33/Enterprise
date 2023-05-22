// Lib
import { ThemeFile } from 'lib/context/ThemeContext';

export const PromoMediaBackgroundTheme: ThemeFile = {
  aw: {
    classes: {
      /** Theme classes **/
      mediaContainer: 'relative max-md:mb-s',
      overlay: 'absolute z-[1] w-full h-full bg-[rgba(0,0,0,0.5)] left-0 top-0',
      iconWrapper: 'mr-s mb-s md:mr-l md:mb-l',
      contentWrapper: 'max-md:px-m md:absolute w-full h-full z-[1] flex items-center md:top-0',
      contentContainer: 'max-w-screen-xl md:ml-[8%] 2xl:ml-auto flex flex-col basis-full mx-auto',
      eyebrow: 'my-xxxs md:max-w-[585px] texy-sm-xs md:text-xs font-medium uppercase font-sans',
      headline: 'my-xxxs md:max-w-[585px] text-sm-l md:text-l font-heavy',
      bodyClass: 'my-xxxs md:max-w-[585px] text-body',
      buttonGroupClass: {
        wrapper: 'my-s md:my-xs',
        cta1Classes: 'text-black',
      },
    },
  },
  rba: {
    classes: {
      /** Theme classes **/
      mediaContainer: 'relative max-md:mb-s',
      overlay: 'absolute z-[1] w-full h-full bg-[rgba(0,0,0,0.5)] left-0 top-0',
      iconWrapper: 'mr-s mb-s md:mr-ml md:mb-ml',
      contentWrapper: 'max-md:px-m md:absolute w-full h-full z-[1] flex items-center md:top-0',
      contentContainer: 'max-w-screen-xl md:ml-[8%] 2xl:ml-auto flex flex-col basis-full mx-auto',
      eyebrow: 'my-xxxs text-link md:max-w-[490px] font-semi-bold uppercase font-sans',
      headline: 'my-xxxs text-sm-s md:text-xxl md:max-w-[490px] font-medium',
      bodyClass: 'my-xxxs md:max-w-[490px] text-s',
      buttonGroupClass: {
        wrapper: 'my-s md:my-xs',
        cta1Classes: 'md:bg-white md:text-black',
      },
    },
  },
};
/* Example of more advanced builder */
/*
import classNames from 'classnames';
const getDynamicStyles = (theme: ThemeName): string => {
  return classNames('text-xl', theme === 'aw' ? 'color-orange' : 'color-green');
};
export const PromoMediaBackgroundTheme = (): ThemeFile => {
  return {
    aw: {
      classes: {
        // Insert Theme classes here  - sample function call
        headline: classNames(getDynamicStyles('aw')),
      },
    },
    rba: {
      classes: {
        // Insert Theme classes here  - sample function call
        headline: classNames(getDynamicStyles('rba')),
      },
    },
  };
};
*/
