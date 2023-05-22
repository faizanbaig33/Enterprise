import { ThemeName } from 'lib/context/ThemeContext';

export const getSearchBoxTheme = (themeName: ThemeName) => {
  switch (themeName) {
    case 'aw':
      return {
        searchBoxWrapper: 'bg-primary py-s px-m mx-[calc(50%-50vw)]',
        searchBoxContainer: 'relative bg-white rounded-[80px] max-w-screen-lg mx-auto',
        searchBoxContainerFocused: 'rounded-3xl',
        inputWrapper: 'input-wrapper px-m py-s flex items-center z-[2]',
        inputWrapperFocused: '',
        searchIconWrapper: 'mr-s cursor-pointer z-[2]',
        closeIconWrapper: 'text-primary cursor-pointer z-[2]',
        searchBoxInput: 'outline-none w-full font-sans text-sm-xs md:text-s font-regular z-[2]',
        suggestionsList:
          'absolute bg-white left-0 top-0 w-full px-l pt-[55px] rounded-3xl shadow-[0_4px_14px_3px_rgba(0,0,0,0.1)] pb-m font-sans text-small text-dark-gray',
        suggestionItem: 'px-s cursor-pointer',
      };
    case 'rba':
      return {
        searchBoxWrapper: 'bg-secondary pt-s pb-l px-m -mt-s mx-[calc(50%-50vw)]',
        searchBoxContainer: 'relative bg-white rounded-[100px] max-w-screen-lg mx-auto',
        searchBoxContainerFocused: 'rounded-3xl ',
        inputWrapper: 'px-m py-xs flex items-center',
        inputWrapperFocused: 'rounded-3xl border border-gray',
        searchIconWrapper: 'mr-s cursor-pointer z-[2]',
        closeIconWrapper: 'text-secondary cursor-pointer z-[2]',
        searchBoxInput: 'outline-none w-full font-sans text-sm-xs md:text-s font-medium z-[2]',
        suggestionsList:
          'absolute bg-white left-0 top-0 w-full px-l pt-[60px] border border-gray rounded-3xl shadow-[0_4px_14px_3px_rgba(0,0,0,0.1)] pb-m text-dark-gray',
        suggestionItem: 'px-s cursor-pointer',
      };
  }
};
