import classNames from 'classnames';
import { ThemeFile } from 'lib/context/ThemeContext';
import { ComponentSpacing } from './HeroWithNavigation';

export const HeroWithNavigationTheme = (spacing: ComponentSpacing): ThemeFile => {
  return {
    aw: {
      classes: {
        headlineContainer: classNames(
          `mt-${spacing}`,
          'grid grid-cols-2 mb-s px-m w-full md:max-w-screen-lg ml:grid-cols-12 ml:mb-m ml:px-12 lg:mx-xl'
        ),
        headline: 'font-sans text-s ml:text-m font-heavy ml:px-3 lg:px-0',
        heroContainer: classNames(`mb-${spacing}`, 'w-full'),
        linkContainer:
          'relative bottom-0 flex flex-col bg-white px-6 pt-xs align-middle ml:bottom-10 ml:mx-m ml:flex-row ml:items-center ml:rounded-full ml:pt-0 ml:shadow-md lg:mx-xl',
        subheadlineStyle: 'align-bottom text-sm-s ml:py-xxs ml:pl-m ml:pr-xxs ml:text-s font-heavy',
        linkStyle:
          'grow border-b border-gray py-xs text-left ml:my-3 ml:mx-2 ml:border-l ml:border-b-0 ml:first:border-l-0 ml:py-0 ml:text-center ml:align-middle',
        linkWrapperStyle:
          'font-sans relative flex w-full grow items-center text-s font-heavy hover:underline hover:decoration-black hover:underline-offset-8 ml:justify-center ml:px-2 ml:text-m',
        svgWrapper: 'flex items-center',
        svgIconStyle:
          'absolute right-0 ml-s flex h-9 w-9 items-center justify-center rounded-full border-4 border-primary hover:bg-primary hover:text-white ml:static',
      },
    },
    rba: {
      classes: {
        headlineContainer: classNames(
          `mt-${spacing}`,
          'grid grid-cols-2 mb-s px-m md:max-w-screen-lg ml:grid-cols-12 ml:mb-m lg:mx-auto'
        ),
        headline: 'font-sans text-m ml:text-l font-medium',
        heroContainer: classNames(`mb-${spacing}`, 'h-full w-full'),
        linkContainer:
          'space-between grid grid-flow-row px-6 pt-xxs ml:bottom-10 ml:mx-xxl ml:grid-flow-col ml:pt-s',
        subheadlineStyle: 'align-bottom pr-s text-sm-s ml:text-s font-extra-light',
        linkStyle:
          'border-b border-gray py-xs text-left ml:mx-s ml:border-l ml:border-b-0 ml:py-0 ml:align-middle',
        linkWrapperStyle:
          'space-between font-sans ml:items-left relative flex w-full grow flex-row text-xs font-bold hover:underline hover:decoration-black hover:underline-offset-8 ml:flex-col ml:px-s ml:text-s ml:font-medium',
        svgWrapper: 'flex items-center',
        svgIconStyle:
          'absolute right-0 pr-xs text-theme-btn-bg-hover hover:underline-offset-8 ml:static ml:pr-0 ml:pt-xxs ml:pb-1',
        buttonStyle: '',
      },
    },
  };
};
