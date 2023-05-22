// Lib
import { ThemeFile } from 'lib/context/ThemeContext';

export const FormStructureTheme = (): ThemeFile => {
  return {
    aw: {
      classes: {
        steps: 'relative mb-s bg-light-gray p-6',
        step: {
          common: 'pr-6',
          active: 'text-primary',
          inactive: '',
        },
      },
    },
    rba: {
      classes: {
        steps: 'relative mb-s bg-light-gray p-6',
        step: {
          common: 'pr-6',
          active: 'text-primary',
          inactive: '',
        },
      },
    },
  };
};
