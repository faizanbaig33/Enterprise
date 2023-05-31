// Lib
import { ThemeFile } from 'lib/context/ThemeContext';

export const ProductIntroTheme: ThemeFile = {
  aw: {
    classes: {
      imageColClasses: 'col-span-6 md:col-span-5 ',
      descriptionColClasses: 'md:col-start-7 col-span-6',
      eyebrow: 'text-sm-xxs md:text-xxs text-dark-gray font-regular mb-xxxs',
      headline: 'text-sm-s md:text-s font-heavy mb-xxs',
      bodyClass: 'mb-s text-dark-gray',
      buttonGroupClass: {
        wrapper: 'flex-col md:items-center',
        cta1Classes: '',
        cta2Classes: 'my-s md:my-0',
      },
      ratingsAndPriceWrapper: 'flex items-center mb-s',
      ratingsIconsList: 'flex mr-m',
      ratingsText: 'mr-m',
      priceText: 'border-l border-secondary px-xxs py-xs',
      favoriteProduct:
        'favorite-product absolute right-0 top-0 inline h-0 w-0 cursor-pointer border-t-0 border-l-0 border-r-[52px] border-b-[52px] border-solid border-[transparent_#e3e3e3_transparent_transparent] transition-[border-color]  duration-500 ease-[ease]',
      favoriteIcon: 'absolute -right-[46px] top-[7px]',
      swatchHeadline: '!font-sans font-heavy text-sm-xxs md:text-base mb-s uppercase',
      swatchTitle: 'mt-xxs text-center font-regular text-base font-serif',
    },
  },
  rba: {
    classes: {
      imageColClasses: 'col-span-6 bg-light-gray flex flex-col items-center justify-center',
      descriptionColClasses: 'col-span-6 md:pl-m',
      headline: 'text-s text-secondary font-medium mb-xxs',
      bodyClass: 'mb-s text-dark-gray',
      buttonGroupClass: {
        wrapper: 'flex-col md:items-center',
        cta1Classes: 'mr-2',
        cta2Classes: 'my-s md:my-0 ',
      },
      ratingsAndPriceWrapper: 'flex items-center py-xs mb-m border-y border-y-grey',
      ratingsIconsList: 'flex mr-m',
      ratingsText: 'mr-m',
      priceText: 'border-l border-grey px-xxs py-xs',
      swatchHeadline: '!font-serif font-bold text-xxs mb-s uppercase',
      swatchTitle: 'mt-xxs text-center font-regular text-body !font-serif',
    },
  },
};
