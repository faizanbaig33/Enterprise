import { ThemeName } from 'lib/context/ThemeContext';

export const getBreadcrumTheme = (themeName: ThemeName) => {
  switch (themeName) {
    case 'aw':
      return {
        wrapperClass: 'flex justify-between items-center font-sans mb-s',
        titleClass: 'font-heavy text-xxs',
        ctaClass: 'font-medium text-small disabled:cursor-not-allowed',
      };
    case 'rba':
      return {
        wrapperClass: 'flex justify-between items-center font-serif',
        titleClass: '!font-serif font-bold text-body',
        ctaClass: 'font-bold  ml:font-heavy text-button ml:text-small disabled:cursor-not-allowed ',
      };
  }
};
