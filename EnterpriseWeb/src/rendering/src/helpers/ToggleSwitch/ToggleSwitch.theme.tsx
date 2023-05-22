// Lib
import { ThemeFile } from 'lib/context/ThemeContext';

export const ToggleSwitchTheme: ThemeFile = {
  aw: {
    classes: {
      toggleWrapper: 'relative w-full cursor-pointer',
      toggleCheckbox: 'sr-only peer',
      toggleSlider:
        'flex w-full rounded-full border border-gray text-center before:absolute before:left-0 before:top-0 before:h-full before:w-1/2 before:rounded-full before:border-2 before:border-primary before:transition-all before:content-[""] peer-checked:before:translate-x-full',
      toggleItem: 'inline w-full grow-1 py-xxs text-dark-gray font-heavy',
      activeToggleItem: 'text-secondary',
    },
  },
  rba: {
    classes: {
      toggleWrapper: 'relative w-full cursor-pointer',
      toggleCheckbox: 'sr-only peer',
      toggleSlider:
        'flex w-[95%] mx-auto rounded-full text-center before:absolute before:left-[3%] before:top-0 before:h-full before:w-1/2 before:rounded-full before:bg-secondary before:transition-all before:content-[""] peer-checked:before:translate-x-[88%] ring ring-gray ring-1 ring-offset-4',
      toggleItem: 'z-10 inline w-full grow-1 py-xxs text-dark-gray font-regular',
      activeToggleItem: 'text-white font-bold',
    },
  },
};
