// Lib
import { ThemeFile } from 'lib/context/ThemeContext';

export const ProductPreviewCardTheme: ThemeFile = {
  aw: {
    classes: {
      /**  Theme classes  **/
      productPreviewCradWrapper: 'flex flex-col items-start border border-gray h-full relative',
      eyebrow: 'text-dark-gray uppercase text-xxs font-heavy order-1',
      headlineWrapper: 'order-2',
      headline: 'text-xs font-heavy hover:underline',
      ratingsAndPriceWrapper: 'flex items-center order-3',
      ratingsIconsList: 'flex mr-xxs',
      ratingsText: 'pr-xxs text-xs',
      priceText: 'border-l border-secondary px-xxs leading-none flex [&>*:nth-child(2)]:text-gray',
      priceLevel: 'text-xs font-heavy',
      body: 'px-s my-s order-3 text-dark-gray',
      headerWrapper: 'flex flex-col items-start px-s pb-s pt-m gap-2 order-1',
      awColorsandCTA:
        'flex max-lg:flex-wrap  lg:mb-s lg:items-end justify-between w-full mt-auto max-lg:mb-s order-3',
      colorSwatchesWrapper: 'px-xs max-lg:mb-s',
      colorLabel: 'text-small',
      swatches: 'mt-xxxs flex',
      actions: 'px-xxs md:px-s order-5 max-md:[&_a]:px-xxs [&_a]:mr-0 max-md:mt-auto',
      buttonGroupClass: {
        wrapper: 'mb-0',
        cta1Classes: 'mb-0',
      },
      colorSwatches:
        'h-[30px] w-[30px] rounded-full mr-[14px] [&_*]:h-[30px] [&_*]:w-[30px] [&_img]:rounded-full',
      favoriteProduct:
        'favorite-product absolute right-0 top-0 inline h-0 w-0 cursor-pointer border-t-0 border-l-0 border-r-[60px] border-b-[60px] border-solid border-[transparent_#e3e3e3_transparent_transparent] transition-[border-color]  duration-500 ease-[ease]',
      favoriteIcon: 'absolute -right-[51px] top-[11px]',
    },
  },
  rba: {
    classes: {
      /**  Theme classes **/
      productPreviewCradWrapper: 'flex h-full flex-col items-start relative',
      eyebrow: 'text-xs text-dark-gray font-semi-bold order-2',
      headlineWrapper: 'order-1',
      headline: 'text-s font-medium hover:underline max-w-[calc(100%_-_22px)]',
      ratingsAndPriceWrapper: 'flex order-3 items-center pt-xxs',
      ratingsIconsList: 'flex mr-xxs ',
      ratingsText: 'pr-xxs text-xs',
      priceText: 'border-l border-grey px-xxs leading-none flex [&>*:nth-child(2)]:text-gray',
      priceLevel: 'text-base font-semi-bold',
      body: 'mb-s order-4 text-dark-gray',
      headerWrapper: 'flex flex-col items-start pt-xs mb-s border-t border-black w-full order-1',
      colorSwatchesWrapper: 'my-s order-3 flex items-center',
      colorLabel: 'text-body text-secondary font-bold',
      swatches: 'mt-xxxs ml-xxs flex',
      actions: 'border-b border-gray w-full md:pb-xs order-5 mt-auto',
      buttonGroupClass: {
        wrapper: 'flex-col md:items-center flex-wrap',
        cta1Classes: 'mr-2',
        cta2Classes: 'my-s mx-s',
      },
      colorSwatches:
        'h-[24px] w-[24px] rounded-full mr-xxs [&_*]:h-[24px] [&_*]:w-[24px] [&_img]:rounded-full',
      favoriteProduct:
        'favorite-product absolute right-0 top-[1px] inline h-0 w-0 cursor-pointer duration-500 ease-[ease]',
      favoriteIcon: 'absolute right-[0px] top-[12px]',
    },
  },
};
