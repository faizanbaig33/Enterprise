import { Facet as HeadlessFacet } from '@coveo/headless';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import { useTheme } from 'lib/context/ThemeContext';
import { FunctionComponent, useEffect, useState } from 'react';
import { Headline } from 'src/helpers/Headline';
import { SvgIcon } from 'src/helpers/SvgIcon/index';
import { FacetSearch } from './FacetSearch';
interface FacetProps {
  controller: HeadlessFacet;
  facetLabel: Field<string>;
  showMoreLabel: Field<string>;
  showLessLabel: Field<string>;
  searchLabel: Field<string>;
  facetClasses?: {
    [property: string]: any;
  };
}

export const Facet: FunctionComponent<FacetProps> = (props) => {
  const { controller, facetClasses } = props;
  const [state, setState] = useState(controller.state);
  const [isExpanded, setIsExpanded] = useState(state.hasActiveValues);
  const { themeName } = useTheme();

  useEffect(() => controller.subscribe(() => setState(controller?.state)), [controller]);

  if (!state.values.length) {
    return <></>;
  }

  return (
    <div className={facetClasses?.facetWrapper}>
      <div className={facetClasses?.categoryLabelWrapper.wrapper}>
        <Headline
          classes={facetClasses?.categoryLabelWrapper.categoryLabel}
          useTag="h3"
          fields={{
            headlineText: props.facetLabel,
            superscriptCTA: {
              value: {
                href: '',
              },
            },
          }}
        />
        {controller.state.hasActiveValues && (
          <button
            onClick={() => controller.deselectAll()}
            className={facetClasses?.categoryLabelWrapper.clearIcon}
          >
            <SvgIcon icon="close" size="lg" />
          </button>
        )}
        <button onClick={() => setIsExpanded(!isExpanded)}>
          <SvgIcon
            icon="caret"
            className={classNames(facetClasses?.categoryLabelWrapper.caretIcon, {
              'rotate-180': isExpanded,
            })}
          />
        </button>
      </div>
      {isExpanded && (
        <div>
          <ul>
            {state.values.map((value) => (
              <li key={value.value} className={facetClasses?.listItem.listItemWrapper}>
                <input
                  type="checkbox"
                  id={value.value}
                  className={facetClasses?.listItem.checkboxInput}
                  checked={controller.isValueSelected(value)}
                  onChange={() => controller.toggleSelect(value)}
                  disabled={state.isLoading}
                />

                <label
                  htmlFor={value.value}
                  className={classNames(
                    facetClasses?.listItem.checkboxLabel,
                    themeName == 'rba' && !controller.isValueSelected(value)
                      ? 'text-dark-gray'
                      : 'text-black'
                  )}
                >
                  {value.value} ({value.numberOfResults})
                </label>
              </li>
            ))}
          </ul>

          {state.canShowMoreValues && (
            <>
              <FacetSearch
                controller={controller.facetSearch}
                facetSearchState={state.facetSearch}
                facetSearchClasses={facetClasses?.facetSearch}
                searchLabel={props.searchLabel}
              />
            </>
          )}

          {state.canShowMoreValues && (
            <button className={facetClasses?.showMore} onClick={() => controller.showMoreValues()}>
              {props.showMoreLabel.value}
            </button>
          )}

          {state.canShowLessValues && !state.canShowMoreValues && (
            <button className={facetClasses?.showMore} onClick={() => controller.showLessValues()}>
              {props.showLessLabel.value}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
