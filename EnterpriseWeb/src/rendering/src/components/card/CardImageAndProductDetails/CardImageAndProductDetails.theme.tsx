// Lib
import { ThemeFile } from 'lib/context/ThemeContext';

export const CardImageAndProductDetailsTheme: ThemeFile = {
  aw: {
    classes: {
      headline: 'p-2 leading-[18px] text-xs font-serif mb:leading-5',
      buttonGroupClass: 'text',
      groupDiv: 'p-2',
      // w-full h-full
      darkImageOverlay:
        'bg-opacity-75 absolute w-0 h-0 min-w-full max-w-full min-h-full max-h-full bg-black top-0 left-0 text-white flex-col flex justify-end',
      parentDiv: 'inline-block relative col-span-12 max-w-[512px]',
      link: 'leading-[10px] mb:leading-[22px] p-2 flex w-fit items-center whitespace-nowrap text-theme-text hover:underline hover:decoration-primary hover:underline-offset-8 disabled:border-gray disabled:text-gray',
      detailsButton:
        'font-sans space-between relative ml-7 flex w-full grow items-center font-medium text-sm-xs md:text-xs text-secondary hover:underline hover:decoration-black hover:underline-offset-8 uppercase',
      iconClass:
        'absolute -left-7 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary hover:bg-primary hover:text-white',
    },
  },
  rba: {
    classes: {
      headline: 'p-2 leading-[18px] text-xs font-regular font-serif mb:leading-5',
      buttonGroupClass: 'text',
      groupDiv: 'p-2',
      darkImageOverlay:
        'bg-opacity-75 absolute w-full h-full bg-black top-0 left-0 text-white flex-col flex justify-end',
      parentDiv: 'inline-block relative col-span-12',
      link: 'leading-[10px] mb:leading-[22px] p-2 flex w-fit items-center whitespace-nowrap text-theme-text font-normal hover:underline hover:decoration-primary hover:underline-offset-8 disabled:border-gray disabled:text-gray',
      detailsButton:
        'space-between relative ml-7 flex w-full grow items-center font-heavy text-sm-xxs leading-3 text-secondary hover:underline hover:decoration-black hover:underline-offset-8',
      iconClass:
        'absolute -left-7 flex h-6 w-6 items-center justify-center hover:underline hover:underline-offset-8 hover:text-white',
    },
  },
};
``;
