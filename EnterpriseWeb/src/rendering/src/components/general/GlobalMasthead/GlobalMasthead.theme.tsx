// Lib
import { ThemeFile } from 'lib/context/ThemeContext';

export const GlobalMastheadTheme: ThemeFile = {
  aw: {
    classes: {
      /** Insert Theme classes here **/
      headline: 'abc-123',
      headWrapper: 'flex flex-col md:items-center md:justify-center py-4',
      title: 'text-[24px] md:text-[40px] font-bold text-white uppercase tracking-widest flex items-center',
      menuIcon: 'md:hidden mr-5',
      anchorWrapper:
        'mt-4 flex flex-col md:flex-row items-start md:items-center justify-between w-full transition ease-in-out delay-150',
      socialIconsWrapper: 'mt-4 md:mt-0',
      iconWrapper: 'flex items-center space-x-4',
      socialIcon: '',
      anchors: 'md:space-x-[16px] space-y-[12px] md:space-y-0 flex flex-col md:flex-row',
      linkTitle: 'text-[16px] text-bold text-white',
    },
  },
  rba: {
    classes: {
      /** Insert Theme classes here **/
    },
  },
};
/* Example of more advanced builder */
/*
import classNames from 'classnames';
const getDynamicStyles = (theme: ThemeName): string => {
  return classNames('text-xl', theme === 'aw' ? 'color-orange' : 'color-green');
};
export const GlobalMastheadTheme = (): ThemeFile => {
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
