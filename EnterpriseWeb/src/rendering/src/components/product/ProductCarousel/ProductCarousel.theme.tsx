// Lib
import { ThemeFile } from 'lib/context/ThemeContext';

export const ProductCarouselTheme: ThemeFile = {
  aw: {
    classes: {
      /** Insert Theme classes here **/
      columnClass: 'grid-cols-12 col-span-12 relative mt-4 product-carousel',
      leftColumnClass: 'grid-cols-12 col-span-9',
      rightColumnClass:
        'sm-px-0 border-t col-span-9 border-gray md:col-span-3 md:p-3 md:border-l md:border-t-0',
      headline: 'text-theme-text text-sm-m md:text-m font-bold mb-s',
      bodyClass: 'text-theme-body text-body md:pr-3 lg:pr-[120px] mb-s',
      subBodyClass: 'text-theme-body text-body mb-s',
      subheadlineClass:
        'text-theme-text font-sans text-sm-s md:text-s mt-s md:mt-0 mb-xxs font-bold',
      exploreButtonClass: 'w-full flex justify-center mt-8',
      arrowButtonGroupClass: 'w-[335px] flex justify-between items-center',
      arrowPrevButtonWrapperClass: 'flex justify-between items-center pl-0',
      arrowNextButtonWrapperClass: 'flex justify-between items-center pr-4.5 md:pr-0',
      arrowButtonClass:
        'button w-11 h-11 flex items-center justify-center rounded-full border-2 border-[#C4BFB6] bg-white cursor-pointer text-[#001722] transition hover:bg-[#001722] hover:text-white hover:border-[#001722]',
    },
  },
  rba: {
    classes: {
      /** Insert Theme classes here **/
      columnClass: 'grid-cols-12 col-span-12',
      leftColumnClass: 'grid-cols-12 col-span-9',
      rightColumnClass:
        'sm-px-0 border-t col-span-9 border-gray md:col-span-3 md:p-3 md:border-l md:border-t-0',
      headline: 'text-theme-text text-sm-m md:text-m font-bold mb-s',
      bodyClass: 'text-theme-body text-body md:pr-3 lg:pr-[120px] mb-s',
      subBodyClass: 'text-theme-body text-body mb-s',
      subheadlineClass:
        'text-theme-text font-sans text-sm-s md:text-s mt-s md:mt-0 mb-xxs font-bold',
      exploreButtonClass: 'w-full flex justify-center mt-8',
      arrowButtonGroupClass: 'w-[335px] flex justify-between items-center',
      arrowPrevButtonWrapperClass: 'flex justify-between items-center pl-0',
      arrowNextButtonWrapperClass: 'flex justify-between items-center pr-4.5 md:pr-0',
      arrowButtonClass:
        'button w-11 h-11 flex items-center justify-center rounded-full border-2 border-[#C4BFB6] bg-white cursor-pointer text-[#001722] transition hover:bg-[#001722] hover:text-white hover:border-[#001722]',
    },
  },
};
