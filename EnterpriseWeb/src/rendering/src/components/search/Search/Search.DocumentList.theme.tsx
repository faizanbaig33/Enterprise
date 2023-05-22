import { ThemeName } from 'lib/context/ThemeContext';

export const getDocumentListTheme = (themeName: ThemeName) => {
  switch (themeName) {
    case 'aw':
      return {
        itemTitle: 'font-sans text-sm-xs ml:text-xs font-heavy uppercase text-black',
        itemLink: 'flex items-center text-darkprimary font-sans font-heavy leading-none',
      };
    case 'rba':
      return {
        itemTitle: 'text-body font-bold uppercase text-black',
        itemLink: 'flex items-center text-darkprimary font-bold',
      };
  }
};
