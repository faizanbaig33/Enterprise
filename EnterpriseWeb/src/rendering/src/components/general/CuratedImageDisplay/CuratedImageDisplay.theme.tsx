import { ThemeFile } from 'lib/context/ThemeContext';

export const CuratedImageDisplayTheme: ThemeFile = {
  aw: {
    classes: {
      headline: 'text-theme-text text-s md:text-m font-heavy mb-s',
      bodyCopy: 'text-theme-body text-body mb-s font-regular',
      SingleButton: {
        wrapper: '',
        cta1Classes: '',
      },
    },
  },
  rba: {
    classes: {
      headline: 'text-theme-text text-sm-m md:text-l font-extra-light mb-s md:mb-xxs',
      bodyCopy: 'text-theme-body text-body mb-s md:mb-m font-regular',
      SingleButton: {
        wrapper: 'mb-m md:mb-l',
        cta1Classes: '',
      },
    },
  },
};
