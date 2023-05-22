// Lib
import { ThemeFile } from 'lib/context/ThemeContext';

export const PageMashupTheme: ThemeFile = {
  aw: {
    classes: {
      sectionheadline: 'text-theme-text text-sm-m md:text-m font-heavy',
      sectionBody: 'text-theme-body text-body mb-m font-regular',
      sectionCta: { wrapper: 'mb-s', cta1Classes: 'font-heavy' },
      featuredCard: {
        wrapper: {
          imagesForAll: 'order-last col-span-full flex items-center  md:order-none md:col-span-4 ',
          featuredImage: 'col-span-12 border-gray md:col-span-6 md:border-b-0',
          noImages: 'col-span-12 border-gray md:col-span-6 border-t md:border-b-0',
        },
        eyebrow: {
          imagesForAll: 'font-heavy text-theme-text text-xxs mb-xxs md:mb-s',
          featuredImage:
            'font-heavy text-theme-text text-xxs mb-xxs md:mb-s border-t border-gray pt-s ',
          noImages: 'font-heavy text-theme-text text-xxs mb-xxs md:mb-s border-gray  ',
        },
        headline: {
          imagesForAll: 'text-theme-text text-sm-m md:text-m font-heavy mb-s',
          featuredImage: 'mb-s font-heavy md:mb-xxs text-theme-text text-sm-m md:text-m',
          noImages: 'mb-xxs font-medium md:mb-s text-theme-text text-sm-s md:text-xl',
        },
        body: {
          imagesForAll: 'text-theme-body text-body mb-m md:mb-l font-regular',
          featuredImage: 'text-theme-body text-body mb-s font-regular',
        },
        singleButton: { wrapper: 'md:mb-0', cta1Classes: 'font-heavy' },
      },
      generalCard: {
        eyebrow: 'font-heavy text-theme-text text-xxs mb-xxs',
        headline: 'text-theme-text text-base font-serif font-heavy mb-xs',
        body: 'text-theme-body text-body mb-xxs md:mb-s font-regular line-clamp-3 md:line-clamp-none',
        singleButton: { cta1Classes: 'font-heavy' },
      },
    },
  },
  rba: {
    classes: {
      sectionheadline: 'text-theme-text text-sm-m md:text-l font-medium',
      sectionBody: 'text-theme-body text-body mb-xxs md:mb-s font-regular',
      sectionCta: { wrapper: 'mb-s', cta1Classes: 'font-bold' },
      featuredCard: {
        wrapper: {
          imagesForAll:
            'order-last col-span-full flex items-center border-b border-gray md:order-none md:col-span-4 md:border-b-0 md:border-t',
          featuredImage: 'col-span-12 border-gray md:col-span-6 md:border-b',
          noImages: 'col-span-12 border-gray md:col-span-6 border-t md:border-b-0',
        },
        eyebrow: {
          imagesForAll: 'font-bold text-theme-text text-small mb-xxs md:mb-s',
          featuredImage: 'font-bold text-theme-text text-small mb-xxs md:mb-s',
          noImages: 'font-bold text-theme-text text-small mb-xxs md:mb-s',
        },
        headline: {
          imagesForAll: 'text-theme-text text-sm-m md:text-l font-extra-light mb-xxs md:mb-s',
          featuredImage: 'mb-xxs font-medium md:mb-s text-theme-text text-sm-m md:text-l',
          noImages: 'mb-xxs font-medium md:mb-s text-theme-text text-sm-s md:text-xl',
        },
        body: {
          imagesForAll: 'text-theme-body text-body mb-s font-regular',
          featuredImage: 'text-theme-body text-body mb-s font-regular',
        },
        singleButton: { wrapper: 'md:mb-0', cta1Classes: 'font-bold' },
      },
      generalCard: {
        eyebrow: 'font-bold text-theme-text text-small mb-xxs',
        headline:
          'text-theme-text text-sm-xs md:text-s font-serif md:font-sans font-bold md:font-medium mb-xxs',
        body: 'text-theme-body text-body mb-xxs md:mb-s font-regular line-clamp-3 md:line-clamp-none',
        singleButton: {},
      },
    },
  },
};
