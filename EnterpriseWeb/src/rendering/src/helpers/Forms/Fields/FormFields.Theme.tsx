// Lib
import { ThemeFile } from 'lib/context/ThemeContext';

export const FormFieldsTheme = (): ThemeFile => {
  return {
    aw: {
      classes: {
        label: 'text-body font-regular flex mb-xxs',
        input:
          'flex h-12 w-full rounded-none border border-gray outline-none focus:border-black py-3 pr-3 pl-2',
        textarea:
          'block min-h-[auto] w-full rounded-none border border-gray outline-none focus:border-black py-3 pr-3 pl-2',
        headline: 'text-theme-text text-sm-m md:text-m font-heavy',
        errorOutline: 'border-error-outline',
        errorText: 'text-error',
      },
    },
    rba: {
      classes: {
        label: 'text-xxs font-heavy flex mb-xxs',
        input:
          'flex h-12 w-full rounded-none border border-gray outline-none focus:border-black py-3 pr-3 pl-2',
        textarea:
          'block min-h-[auto] w-full rounded-none border border-gray outline-none focus:border-black py-3 pr-3 pl-2',
        headline: 'text-theme-text text-sm-m md:text-m font-medium font-sans',
      },
    },
  };
};
