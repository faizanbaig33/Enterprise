// Lib
import { ThemeFile } from 'lib/context/ThemeContext';

export const StandaloneSearchBoxTheme: ThemeFile = {
  aw: {
    classes: {
      standaloneSearchBoxContainer: 'w-full ml:max-w-[996px] bg-white mx-auto my-xs relative',
      standaloneSearchBoxWrapper:
        'w-full flex ml:flex-row-reverse items-center justify-center p-xxs ml:p-0 border border-gray ml:border-none',
      searchBox: 'flex items-center w-full ml-s ml:ml-0 ml:p-s ml:border ml:border-dark-gray',
      searchBoxInput: 'w-full font-sans text-small ml:text-s text-dark-gray outline-0',
      closeIconWrapper: 'text-primary cursor-pointer',
      searchIconWrapper: 'ml:p-[21px] ml:border ml:border-l-0 ml:rounded-[2px] cursor-pointer',
      omniResultsWrapper:
        'bg-white pt-xs pb-s px-xs border border-gray border-t-0 font-sans text-small text-dark-gray absolute w-full',
      suggestionsWrapper: '',
      suggestionItem: 'cursor-pointer py-[2px]',
      instantResultsTitle: 'font-demi text-black mt-xs mb-xxs',
      instantResultsWrapper: '',
    },
  },
  rba: {
    classes: {
      standaloneFocusedClasses: 'rounded-b-[10px] shadow-[0_4px_14px_3px_rgba(0,0,0,0.1)] relative',
      standaloneSearchBoxContainer:
        'w-full ml:max-w-[996px] mx-auto my-xs bg-white rounded-[20px] border-x border-b border-gray overflow-hidden',
      standaloneSearchBoxWrapper:
        'w-full flex items-center justify-center rounded-[100px] px-xs py-xxs bg-white border border-gray',
      searchBox: 'flex items-center w-full ml-xxs',
      searchBoxInput: 'w-full text-xxs outline-0',
      closeIconWrapper: 'cursor-pointer',
      searchIconWrapper: 'cursor-pointer',
      omniResultsWrapper: 'bg-white pt-xs pb-m px-s text-xxs text-dark-gray absolute w-full',
      suggestionsWrapper: '',
      suggestionItem: 'cursor-pointer py-xxxs',
      instantResultsTitle: 'font-demi text-black mt-xs mb-xxs',
      instantResultsWrapper: '',
    },
  },
};
