// Lib
import { ThemeFile } from 'lib/context/ThemeContext';
import { getPagerTheme } from './Search.Pager.theme';
import { getResultListTheme } from './Search.ResultList.theme';
import { getSearchBoxTheme } from './Search.SearchBox.theme';
import { getBreadcrumTheme } from './Search.Breadcrumb.theme';
import { getFacetsTheme } from './Search.Facets.theme';
import { getDocumentListTheme } from './Search.DocumentList.theme';
import { getGridLayoutTheme } from './Search.GridLayout.theme';

export const SearchTheme: ThemeFile = {
  aw: {
    classes: {
      heroSearchContentWrapper:
        'flex flex-col items-center relative mb-xxs before:absolute before:content-[""] before:w-[48px] before:h-[6px] before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:bg-primary',
      headline: 'text-sm-l md:text-l font-heavy mb-s',
      searchBoxClasses: getSearchBoxTheme('aw'),
      resultListClasses: getResultListTheme('aw'),
      documentListClasses: getDocumentListTheme('aw'),
      gridLayoutClasses: getGridLayoutTheme('aw'),
      facetClasses: getFacetsTheme('aw'),
      breadcrumbClasses: getBreadcrumTheme('aw'),
      didYouMeanClasses: {
        didYouMeanLabel: 'font-sans text-body font-regular pb-xxs',
        correctedQuery: 'font-heavy underline text-primary',
        wasAutomaticallyCorrected: 'font-sans text-body [&_span]:font-heavy',
      },
      querySummaryClasses: 'font-sans text-small font-regular',
      pagerClasses: getPagerTheme('aw'),
      triggeredBannerClasses: 'bg-light-gray p-s',
    },
  },
  rba: {
    classes: {
      heroSearchContentWrapper:
        'flex flex-col md:flex-row md:justify-between md:items-center relative bg-secondary text-white before:absolute before:content-[""] before:w-[40px] md:before:w-[85px] before:h-[3px] before:bottom-0 before:bg-primary pt-l max-w-screen-lg mx-auto',
      headline: 'text-sm-m md:text-l font-medium mb-s',
      ctaWrapper: '',
      searchBoxClasses: getSearchBoxTheme('rba'),
      resultListClasses: getResultListTheme('rba'),
      documentListClasses: getDocumentListTheme('rba'),
      gridLayoutClasses: getGridLayoutTheme('rba'),
      facetClasses: getFacetsTheme('rba'),
      breadcrumbClasses: getBreadcrumTheme('rba'),
      didYouMeanClasses: {
        didYouMeanLabel: 'font-serif text-body font-regular pb-xxs',
        correctedQuery: 'font-semi-bold underline text-darkprimary',
        wasAutomaticallyCorrected: 'font-sans text-body [&_span]:font-medium',
      },
      querySummaryClasses: 'text-body font-regular',
      pagerClasses: getPagerTheme('rba'),
      triggeredBannerClasses: 'bg-light-gray p-s',
    },
  },
};
