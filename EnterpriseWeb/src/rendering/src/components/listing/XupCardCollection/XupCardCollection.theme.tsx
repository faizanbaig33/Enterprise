import { ThemeFile } from 'lib/context/ThemeContext';

export const XupCardCollectionTheme: ThemeFile = {
  aw: {
    classes: {
      headlineClass: 'text-sm-m md:text-m font-bold mb-xxs',
      bodyClass: 'text-body text-dark-gray font-regular mb-m',
      buttonGroupClass: {
        wrapper: 'flex flex-col md:flex-row items-start',
      },
    },
  },
  rba: {
    classes: {
      headlineClass: 'text-m md:text-l font-medium mb-xxs',
      bodyClass: 'text-body text-dark-gray font-regular mb-m',
      buttonGroupClass: {
        wrapper: 'flex flex-col md:flex-row items-start',
      },
    },
  },
};
