// Lib
import { ThemeFile } from 'lib/context/ThemeContext';

export const HeroFeaturedProductTheme: ThemeFile = {
  aw: {
    classes: {
      productWrapper: 'relative bg-light-gray text-center pt-xs md:pt-l',
      headingsWrapper: 'font-bold',
      smallHeadline: 'text-m text-dark-gray',
      largeHeadline: 'text-sm-xxl md:text-xxl -mb-s',
      imageWrapper: '-mb-s ml:-mb-xl h-full',
      subheadingsList:
        'flex flex-col md:flex-row justify-center text-center mt-s md:mt-l !font-sans',
      subheadingItem:
        'relative px-m md:px-l py-s first:before:hidden before:absolute before:content-[""] before:w-full md:before:w-[1px] before:h-[1px] md:before:h-full before:bg-secondary before:top-0 before:left-0',
      rteClasses: 'text-sm-s font-bold md:text-s',
      additionalDesktopClasses: 'relative h-[310px] md:h-[592px] md:max-w-[592px] mx-auto',
      additionalMobileClasses: 'mx-auto',
    },
  },
  rba: {
    classes: {
      productWrapper: 'relative pt-l md:pt-xl',
      headingsWrapper: 'font-bold md:font-medium ml:absolute ml:top-1/2 ml:-translate-y-1/2 w-1/2',
      smallHeadline: 'text-xxs md:text-s font-bold md:font-medium !font-serif md:!font-sans',
      largeHeadline: 'text-l md:text-xxl font-medium',
      imageWrapper: 'mt-s -mb-l w-full',
      subheadingsList: 'flex flex-col md:flex-row mt-s ml:mt-l ml:pt-s !font-sans',
      subheadingItem:
        'flex-1 relative py-xs before:absolute before:content-[""] before:w-m md:before:w-l before:h-[3px] before:bg-primary before:top-0 before:left-0',
      rteClasses: 'text-xs md:text-m font-bold md:font-medium',
      additionalDesktopClasses: 'relative h-full w-full mx-auto ml:float-right -mb-s ml:-mb-xl',
      additionalMobileClasses: 'relative mx-auto',
    },
  },
};
