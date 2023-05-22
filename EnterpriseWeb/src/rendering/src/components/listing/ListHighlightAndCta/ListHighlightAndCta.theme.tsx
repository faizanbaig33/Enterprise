import { ThemeFile } from 'lib/context/ThemeContext';

export const ListHighlightAndCtaTheme = (): ThemeFile => {
  return {
    aw: {
      classes: {
        headlineBorder: 'col-span-12 border-t border-black md:col-span-3',
        headlineClass: 'text-sm-xs lg:text-xs font-bold mr-1 uppercase',
        listItemContainer: 'col-span-12 border-black md:col-span-6',
        listItemHeadlineBorder: 'gap-s border-t border-gray', // p-3
        contentClasses: {
          listItemHeadlineClass:
            'text-sm-s md:text-s py-2 font-bold content-center flex flex-1 items-center justify-start mt-2',
          body: 'text-body text-dark-gray font-regular mb-m flex flex-col',
        },
        buttonClass: {
          wrapper: 'flex flex-col md:flex-row items-start',
          cta1Classes: 'mr-3 ml-0',
        },
        buttonGroupClass: {
          wrapper: 'flex-col',
          cta1Classes: 'mr-2 mb-m md:mb-0',
          cta2Classes: '',
        },
        buttonGroupClassRightIcon: {
          wrapper: 'flex-col mb-0',
          cta1Classes: 'mr-0',
          cta2Classes: 'ml-xs md:ml-0 px-s md:px-0',
        },
      },
    },

    rba: {
      classes: {
        headlineBorder: 'col-span-12 md:col-span-4',
        headlineClass: 'text-m lg:text-l font-extra-light',
        listItemContainer: 'col-span-12 border-black last:border-b md:col-span-6',
        listItemHeadlineBorder: 'gap-s col-span-12 border-t border-black md:col-span-3',
        contentClasses: {
          headlineContainer: 'text-m lg:text-l font-extra-light',
          listItemHeadlineClass: 'font-sans text-sm-s md:text-s font-medium my-s mr-1',
          body: 'text-body text-dark-gray font-regular mb-m',
          ctaContainer: 'flex flex-col md:flex-row items-start md:items-center',
        },
        buttonGroupClass: {
          wrapper: 'flex flex-col md:flex-row items-start mb-s',
          cta1Classes: 'mr-2',
          cta2Classes: '',
        },
        buttonGroupClassRightIcon: {
          wrapper: 'flex flex-col md:flex-row items-start mb-0',
          cta1Classes: 'text-sm-s text-s font-medium',
          cta2Classes: 'my-s md:my-0 mx-s',
        },
      },
    },
  };
};
