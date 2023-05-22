import { ThemeFile } from 'lib/context/ThemeContext';
import classNames from 'classnames';

export const PromoFeaturedMediaTheme: ThemeFile = {
  aw: {
    classes: {
      imageDivClass: 'order-first col-span-12',
      captionClass: 'hidden',
      leftContainerClass: 'col-span-9 my-auto mt-0 flex flex-col self-center px-xl py-s pr-xxl',
      subheadlineClass: 'text-theme-text text-small uppercase font-bold mb-2',
      headlineClass: 'text-theme-text text-xs font-heavy mb-2',
      bodyClass: 'text-theme-body mb-4',
      buttonGroupClass: {
        wrapper: classNames(
          'col-span-12',
          'flex',
          'flex-col',
          'lg:flex-row',
          'items-start',
          'text-xs',
          'font-heavy'
        ),
        cta1Classes: classNames('lg:mr-3 lg:first:ml-0 lg:last:mr-0', 'bg-theme-bg'),
        cta2Classes: '',
      },
      rightContainerClass: 'col-span-3 my-auto mt-0 flex flex-col self-center px-l py-s pr-xl',
      highlightContainerClass: '',
      highlightTitleClass:
        'text-theme-text text-small uppercase font-bold py-2 border-gray border-t',
      highlightDescriptionClass: 'text-theme-body text-small mb-m',
    },
  },
  rba: {
    classes: {
      imageDivClass: 'order-first col-span-12',
      captionClass: 'hidden',
      leftContainerClass:
        'col-span-6 my-auto mt-0 flex flex-col self-center px-xl py-s pr-xxl pt-xxs',
      subheadlineClass: 'text-theme-text text-small uppercase font-bold mb-2',
      headlineClass: 'text-theme-text text-xs font-bold mb-2',
      bodyClass: 'text-theme-body mb-4',
      buttonGroupClass: {
        wrapper: classNames(
          'col-span-12',
          'flex',
          'flex-col',
          'lg:flex-row',
          'items-start',
          'text-xs',
          'font-heavy'
        ),
        cta1Classes: classNames('lg:mr-3 lg:first:ml-0 lg:last:mr-0', 'bg-theme-bg'),
        cta2Classes: '',
      },
      rightContainerClass:
        'col-span-6 my-auto mx-auto flex flex-row self-center px-l py-s pr-xl pt-xxs justify-between',
      highlightContainerClass: 'mr-xl',
      highlightTitleClass:
        'text-theme-body text-small font-heavy uppercase border-theme-btn-bg-hover border-t-4 border-top',
      highlightDescriptionClass: 'text-theme-text font-bold',
    },
  },
};
