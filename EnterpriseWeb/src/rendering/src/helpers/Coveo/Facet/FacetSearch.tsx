import { FacetSearch as HeadlessFacetSearch, FacetSearchState } from '@coveo/headless';
import { FunctionComponent } from 'react';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { useState } from 'react';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { BodyCopy } from 'src/helpers/BodyCopy';

export interface FacetSearchProps {
  controller: HeadlessFacetSearch;
  facetSearchState: FacetSearchState;
  searchLabel: Field<string>;
  noFacetResultsBody: Field<string>;
  facetSearchClasses?: {
    [property: string]: string;
  };
}

export const FacetSearch: FunctionComponent<FacetSearchProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { facetSearchClasses, searchLabel } = props;
  const updateSearch = (text: string) => {
    props.controller.updateText(text);
    props.controller.search();
  };

  const facetSearchResult = (): JSX.Element | JSX.Element[] => {
    if (props.facetSearchState?.values.length > 0) {
      return props.facetSearchState?.values?.map((facetSearchValue) => (
        <li key={facetSearchValue.rawValue} className={facetSearchClasses?.resultListItem}>
          <button
            onClick={() => {
              props.controller.select(facetSearchValue);
            }}
          >
            {facetSearchValue.displayValue} ({facetSearchValue.count})
          </button>
        </li>
      ));
    } else {
      return (
        <BodyCopy
          classes="text-theme-body text-body mx-xxs"
          fields={{ body: props.noFacetResultsBody }}
        />
      );
    }
  };

  return (
    <div>
      <button onClick={() => setIsExpanded(!isExpanded)} className="mt-s flex items-center">
        <SvgIcon
          icon={isExpanded ? 'minus' : 'plus'}
          size="sm"
          className={facetSearchClasses?.searchPlusIcon}
        />
        <span className={facetSearchClasses?.searchLabel}> {searchLabel.value} </span>
      </button>

      {isExpanded && (
        <>
          <input
            value={props.facetSearchState.query}
            autoFocus
            onInput={(e) => updateSearch(e.currentTarget.value)}
            className={facetSearchClasses?.searchInput}
          />

          {props.facetSearchState.query !== '' && (
            <ul className="mt-xxs list-none  rounded border border-gray">{facetSearchResult()}</ul>
          )}
        </>
      )}
    </div>
  );
};
