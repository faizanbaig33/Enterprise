// Lib
import { ThemeFile } from 'lib/context/ThemeContext';

export const AccordionTheme: ThemeFile = {
  aw: {
    classes: {
      headline: 'px-m md:max-w-screen-lg lg:mx-auto text-sm-m md:text-m font-heavy mb-s ',
      sectionTitleWrapper:
        'sectionTitleWrapper border-t  py-m border-gray md:max-w-screen-lg lg:mx-auto px-m flex w-full items-center justify-between hover:underline hover:underline-offset-4   group',
      sectiontitle: ' text-sm-s md:text-s font-heavy max-w-[80%]',
      sectionIcon:
        'border-2 border-primary rounded-full h-ml w-ml flex items-center justify-center group-hover:bg-primary group-hover:text-white',
      contentWrapper:
        ' block [&:last-child]:after:w-full [&:last-child]:after:border-t- [&:last-child]:after:border-gray [&:last-child]:after:max-w-screen-lg [&:last-child]:after:mx-auto [&:last-child]:after:block ',
    },
  },
  rba: {
    classes: {
      headline:
        'px-m md:max-w-screen-lg lg:mx-auto text-sm-m md:text-l font-extra-light mb-xxs md:mb-s',
      sectionTitleWrapper:
        'sectionTitleWrapper border-t  py-s md:max-w-screen-lg lg:mx-auto px-m flex w-full items-center justify-between hover:underline hover:underline-offset-4 px-s group',
      sectiontitle: 'text-sm-xs md:text-s font-bold md:font-medium max-w-[80%]',
      sectionIcon: 'group-hover:text-primary',
      contentWrapper:
        'block [&:last-child]:after:w-full [&:last-child]:after:border-t  [&:last-child]:after:max-w-screen-lg [&:last-child]:after:mx-auto [&:last-child]:after:block ',
    },
  },
};
