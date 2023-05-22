// Lib
import { ThemeFile } from 'lib/context/ThemeContext';

export const PromoFlipsnackViewerTheme = (flipsnackLeftAlign: boolean): ThemeFile => {
  return {
    aw: {
      classes: {
        iframe: 'w-full h-full min-h-[100vw] md:min-h-[500px]',
        iframeContainer: 'col-span-12 ml:col-span-8 mb-s ml:mb-0',
        headline: 'text-theme-text text-s md:text-m font-heavy mb-s',
        body: 'text-theme-body text-body mb-m ml:mb-l',
        copyContainer: `col-span-12 ml:col-span-4 ${flipsnackLeftAlign ? '' : 'ml:order-first'}`,
        buttonGroupClasses: {
          wrapper: 'flex-col md:flex-col items-start md:!items-start mb-0',
          cta1Classes: 'mb-m ml:mb-s last:mb-0',
          cta2Classes: '!ml-0',
        },
      },
    },
    rba: {
      classes: {
        iframe: 'w-full h-full min-h-[100vw] md:min-h-[500px]',
        iframeContainer: 'col-span-12 ml:col-span-8',
        headline: 'text-theme-text text-sm-m ml:text-l font-extra-light mb-xxs ml:mb-s',
        body: 'text-theme-body text-body font-regular mb-xxs ml:mb-s',
        copyContainer: `col-span-12 ml:col-span-4 ml:flex ml:flex-col ml:content-center ml:justify-center ${
          flipsnackLeftAlign ? '' : 'ml:order-first'
        }`,
        buttonGroupClasses: {
          wrapper: 'flex-col md:flex-col items-start md:!items-start mb-0',
          cta1Classes: 'mb-s ml:mb-s last:mb-0',
          cta2Classes: '!ml-0',
        },
      },
    },
  };
};
