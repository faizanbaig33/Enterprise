import { ThemeName } from 'lib/context/ThemeContext';

export const getResultListTheme = (themeName: ThemeName) => {
  switch (themeName) {
    case 'aw':
      return {
        resultItem: 'border-b border-gray py-xxs md:pl-s',
        featuredResultItem:
          'border-0 pr-xs -mx-xs pl-xs ring-2 md:mx-0 md:pl-s md:ring-inset ring-primary cursor-pointer',
        resultEyebrow:
          'text-dark-gray font-sans text-small md:text-xxs font-heavy uppercase mb-xxxs',
        resultHeading:
          'text-sm-xxs md:text-text-link text-darkprimary hover:font-heavy hover:underline',
        resultDescription: 'text-small md:text-body mr-xxs md:mr-s',
        noResultsHeadline: 'font-medium text-sm-m md:text-m my-ml md:mt-[66px] md:mb-m',
        noResultsBody: '',
      };
    case 'rba':
      return {
        resultItem: 'border-b border-gray py-s md:pb-m md:pl-s',
        featuredResultItem:
          'border-0 pr-xxs -mx-xs pl-xs ring-[3px] md:mx-0 mb-xxs md:pl-s md:ring-inset ring-primary cursor-pointer',
        resultEyebrow: 'text-secondary text-xxs font-bold uppercase mb-xxs',
        resultHeading:
          'text-base text-darkprimary font-heavy hover:underline underline-offset-4 mb-xs',
        resultDescription: 'text-body text-dark-gray mr-xxs md:mr-s',
        noResultsHeadline: 'font-medium text-sm-s md:text-m my-s md:mt-ml',
        noResultsBody: '',
      };
  }
};
