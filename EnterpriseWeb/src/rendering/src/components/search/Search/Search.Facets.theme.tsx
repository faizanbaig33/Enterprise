import { ThemeName } from 'lib/context/ThemeContext';

export const getFacetsTheme = (themeName: ThemeName) => {
  switch (themeName) {
    case 'aw':
      return {
        facetGroup: {
          wrapper: 'mt-l ml:mt-0 px-m ml:px-0',
          filterCta: 'py-xxs px-m border font-sans border-dark-gray text-xxs rounded',
          showResultCta:
            'flex w-fit items-center whitespace-nowrap rounded-lg border-4 border-theme-btn-border bg-theme-btn-bg px-m py-[9px] font-sans font-sans text-button font-bold text-theme-btn-text hover:border-theme-btn-border-hover hover:bg-theme-btn-bg-hover hover:text-theme-btn-text-hover disabled:border-gray disabled:text-gray',
          showResultCtaIcon: 'ml-xxs',
        },
        facetWrapper: 'pt-s pb-l border-t border-secondary',
        categoryLabelWrapper: {
          wrapper: 'flex items-center',
          categoryLabel: 'font-sans grow text-sm-xs ml:text-xs font-heavy',
          clearIcon: 'hidden ml:block mr-s cursor-pointer',
          caretIcon: 'block cursor-pointer',
        },
        listItem: {
          listItemWrapper: 'mt-s flex items-center',
          checkboxInput:
            'h-[18px] w-[18px] bg-white  border rounded-0 cursor-pointer border-dark-gray  focus:ring-0  checked:bg-black checked:hover:bg-black checked:bg-black text-white',
          checkboxLabel: 'text-serif ml-xxs cursor-pointer text-body font-regular',
        },
        showMore: 'block text-small font-sans text-darkprimary border-b font-regular mt-s',
        facetSearch: {
          searchLabel: 'text-serif ml-xxs text-body font-regular',
          searchInput: 'border mt-xxs px-xxxs',
          searchPlusIcon:
            'h-[18px] w-[18px] flex items-center justify-center border border-dark-gray text-gray',
          resultListItem: 'text-serif ml-xxs text-body font-regular pt-xxs',
        },
      };

    case 'rba':
      return {
        facetGroup: {
          wrapper: 'mt-l ml:mt-0 px-m ml:px-0',
          filterCta: 'py-xs px-s border font-serif text-button font-bold',
          showResultCta:
            'group relative flex w-fit items-center bg-theme-btn-bg px-s py-xs font-sans text-body text-theme-btn-text hover:bg-theme-btn-bg-hover hover:text-theme-btn-text-hover disabled:border-gray disabled:text-gray',
          showResultCtaIcon: 'ml-[10px] text-primary group-hover:text-secondary',
        },
        facetWrapper: 'pt-xs pb-l border-t border-gray',
        categoryLabelWrapper: {
          wrapper: ' flex items-center',
          categoryLabel: '!font-serif text-xs grow font-bold',
          clearIcon: 'hidden ml:block mr-s cursor-pointer',
          caretIcon: 'block cursor-pointer',
        },
        listItem: {
          listItemWrapper: 'mt-s flex items-center',
          checkboxInput:
            'h-[20px] w-[20px] bg-white  border rounded-0 border-gray cursor-pointer focus:ring-0 checked:hover:bg-black checked:bg-black text-white',
          checkboxLabel: 'text-serif ml-xxs text-body cursor-pointer font-regular',
        },
        showMore: 'text-body font-serif text-darkprimary font-bold mt-s',
        facetSearch: {
          searchLabel: 'text-serif ml-xxs text-body font-regular',
          searchPlusIcon:
            'h-[20px] w-[20px] flex items-center justify-center  border border-gray bg-gray text-black',
          searchInput: 'border mt-xxs px-xxxs',
          resultListItem: 'text-serif ml-xxs text-body font-regular pt-xxs w-full',
        },
      };
  }
};
