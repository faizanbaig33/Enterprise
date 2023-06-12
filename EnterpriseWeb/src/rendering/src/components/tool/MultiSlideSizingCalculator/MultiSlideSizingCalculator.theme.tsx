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
        formWrapper: 'col-span-12 grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 ml:gap-x-[116px]',
        labelClass: 'flex text-body font-regular',
        columnSpan1: 'relative col-span-1 mb-m md:mb-ml',
        columnSpan2: 'relative md:col-span-2 mb-m md:mb-ml md:pr-28',
        selectColumnSpan1:
          'form-control w-full border border-gray text-body outline-none focus:border-black',
        selectColumnSpan2:
          'form-control w-full border border-gray text-body outline-none focus:border-black md:w-1/2',
        errorInvalid:
          'form-control placeholder-dark-gray text-body is-invalid w-full border border-error-outline focus:border-black',
        errorValid:
          'form-control placeholder-dark-gray text-body w-full border border-gray outline-none focus:border-black',
        footer: 'mt-2.5',
        helpText: 'pr-1 text-small leading-[22px]',
        singleButton: { wrapper: 'md:mb-0', cta1Classes: 'font-heavy' },
        modalLinkButton: 'text-small leading-[22px] text-darkprimary hover:underline',
        printButton:
          'flex w-fit items-center whitespace-nowrap text-body leading-[22px] text-primary hover:underline',
        resetButton:
          'ml-xs flex w-full items-center justify-end whitespace-nowrap font-sans text-text-link font-heavy text-theme-text hover:underline hover:decoration-secondary hover:underline-offset-8 disabled:border-gray disabled:text-gray md:ml-0 md:w-fit md:px-0',
        resultsOutputWrapper:
          'col-span-12 grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 ml:gap-x-[116px]',
        submitWrapper:
          'relative col-span-1 my-s mb-s flex w-full md:col-span-2 md:my-xs md:flex-row md:items-center md:space-x-4',
        submitButton:
          'mr-m flex w-fit items-center whitespace-nowrap rounded-lg border-4 border-theme-btn-border bg-theme-btn-bg px-m py-[9px] font-sans text-button font-heavy text-theme-btn-text text-black hover:border-theme-btn-border-hover hover:bg-theme-btn-bg-hover hover:text-theme-btn-text-hover disabled:border-gray disabled:text-gray',
        prevButton: 'mr-m flex w-fit items-center whitespace-nowrap rounded-lg border-4 border-gray bg-theme-btn-bg px-m py-[9px] font-sans text-button font-heavy text-theme-btn-text text-black hover:bg-gray hover:bg-theme-btn-bg-hover hover:text-theme-btn-text-hover disabled:border-gray disabled:text-gray',
        tableHead:
          'border-b border-neutral-700 bg-neutral-800 text-neutral-50 dark:border-neutral-600 dark:bg-neutral-700',
        tableRow: 'border-b dark:border-neutral-500',
        tdColumn: 'whitespace-nowrap px-4 py-2 font-demi',
        tdColumnCenter: 'whitespace-nowrap px-4 py-2 text-center font-demi',
        thLeft: 'py-4 pl-4 text-left text-lg font-heavy',
        thCenter: 'py-4 text-center text-lg font-heavy',
        thRight: 'py-4 pr-4 text-center text-lg font-heavy',
      },
      stepperConnectorStyle: {
        activeColor: '#f26924',
        completedColor: '#dd7540',
        // disabledColor: '#f26924',
      },
      stepperConnectorConfig: {
        activeBgColor: '#f26924',
        // activeTextColor: '#001722',
        completedBgColor: '#dd7540',
        // completedTextColor: '#001722',
        // // inactiveBgColor: '',
        // inactiveTextColor: '#001722',
        // fontWeight: '700'
      }
    },
    rba: {
      classes: {
        /** Insert Theme classes here **/
      },
    }
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
