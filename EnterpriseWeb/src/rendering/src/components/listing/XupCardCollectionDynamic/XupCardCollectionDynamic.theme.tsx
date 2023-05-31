// Lib
import { getGridLayoutTheme } from 'components/search/Search/Search.GridLayout.theme';
import { ThemeFile } from 'lib/context/ThemeContext';
import { cardAlignment } from './XupCardCollectionDynamic';

export const XupCardCollectionDynamicTheme = (alignment: cardAlignment): ThemeFile => {
  return {
    aw: {
      classes: {
        /** Insert Theme classes here **/
        gridLayoutClasses: getGridLayoutTheme('aw', alignment),
        headlineClass: 'text-sm-m md:text-m font-heavy mb-s',
        bodyClass: 'text-body text-dark-gray font-regular mb-s',
        buttonGroupClass: {
          wrapper: 'flex flex-col md:flex-row items-start',
        },
      },
    },
    rba: {
      classes: {
        /** Insert Theme classes here **/
        gridLayoutClasses: getGridLayoutTheme('rba', alignment),
        headlineClass: 'text-m md:text-l font-extra-light mb-xxs',
        bodyClass: 'text-body text-dark-gray font-regular mb-m',
        buttonGroupClass: {
          wrapper: 'flex flex-col md:flex-row items-start',
        },
      },
    },
  };
};
