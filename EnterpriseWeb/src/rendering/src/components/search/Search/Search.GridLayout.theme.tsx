import { ThemeName } from 'lib/context/ThemeContext';

export const getGridLayoutTheme = (themeName: ThemeName) => {
  switch (themeName) {
    case 'aw':
      return {
        gridItem: 'border-b border-gray',
        imageWrapper: 'mb-s',
        eyebrow: 'font-heavy text-xxs leading-none text-dark-gray uppercase mb-xs',
        headline: 'font-heavy !font-serif text-base leading-[22px] mb-xxxs',
        subheadline: 'font-regular !font-serif text-body mb-xs',
        body: 'text-body text-dark-gray font-regular mb-s',
        buttonGroup: {
          wrapper: '',
          cta1Classes: '',
        },
      };
    case 'rba':
      return {
        gridItem: 'border-b border-gray',
        imageWrapper: 'mb-s',
        eyebrow: 'font-bold !font-serif text-xxs uppercase mb-xxs',
        headline: 'font-medium text-sm-s mb-xxs',
        subheadline: 'font-bold !font-serif text-body text-dark-gray mb-xxs',
        body: 'text-body text-dark-gray font-regular mb-s',
        buttonGroup: {
          wrapper: '',
          cta1Classes: '',
        },
      };
  }
};
