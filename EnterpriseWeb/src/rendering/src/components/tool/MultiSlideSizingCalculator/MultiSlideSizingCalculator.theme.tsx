// Lib
import { ThemeFile } from 'lib/context/ThemeContext';

export const MultiSlideSizingCalculatorTheme = (): ThemeFile => {
  return {
    aw: {
      classes: {
        /** Insert Theme classes here **/
        title: 'font-bold text-[34px] border-b-4 border-theme-btn-border',
        descriptionWrapper: 'grid grid-cols-1 md:grid-cols-4 gap-4 mt-10',
        description: 'col-span-3 text-[12px] leading-5',
        help: '',
        helpContent: 'px-4 py-2 border-l-2 border-[#dbdada] text-[12px] leading-6',
        formStep: 'mt-5 pt-2 bg-[#f3f3f3]',
        prevButton: 'mr-m flex w-fit items-center whitespace-nowrap rounded-lg border-4 border-gray bg-theme-btn-bg px-m py-[9px] font-sans text-button font-heavy text-theme-btn-text text-black hover:bg-gray hover:bg-theme-btn-bg-hover hover:text-theme-btn-text-hover disabled:border-gray disabled:text-gray',
        submitButton: 'mr-m flex w-fit items-center whitespace-nowrap rounded-lg border-4 border-theme-btn-border bg-theme-btn-bg px-m py-[9px] font-sans text-button font-heavy text-theme-btn-text text-black hover:border-theme-btn-border-hover hover:bg-theme-btn-bg-hover hover:text-theme-btn-text-hover disabled:border-gray disabled:text-gray'
      },
    },
    rba: {
      classes: {
        /** Insert Theme classes here **/
      },
    },
  }
};
/* Example of more advanced builder */
/*
import classNames from 'classnames';
const getDynamicStyles = (theme: ThemeName): string => {
  return classNames('text-xl', theme === 'aw' ? 'color-orange' : 'color-green');
};
export const MultiSlideSizingCalculatorTheme = (): ThemeFile => {
  return {
    aw: {
      classes: {
        // Insert Theme classes here  - sample function call
        headline: classNames(getDynamicStyles('aw')),
      },
    },
    rba: {
      classes: {
        // Insert Theme classes here  - sample function call
        headline: classNames(getDynamicStyles('rba')),
      },
    },
  };
};
*/
