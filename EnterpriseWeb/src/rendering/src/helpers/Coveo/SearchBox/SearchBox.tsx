import { SearchBox as HeadlessSearchBox } from '@coveo/headless';
import { FunctionComponent, useEffect, useState } from 'react';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { twMerge } from 'tailwind-merge';

type SearchBoxProps = {
  controller: HeadlessSearchBox;
  searchBoxClasses?: {
    [property: string]: string;
  };
  fields: Feature.EnterpriseWeb.Elements.Search.SearchBox['fields'];
};

export const SearchBox: FunctionComponent<SearchBoxProps> = (props) => {
  const { controller, searchBoxClasses } = props;
  const [state, setState] = useState(controller.state);
  const [focused, setFocused] = useState(false);

  useEffect(() => controller.subscribe(() => setState(controller.state)), [controller]);

  return (
    <div className={searchBoxClasses?.searchBoxWrapper}>
      <div
        className={twMerge(
          searchBoxClasses?.searchBoxContainer,
          focused && state.suggestions.length > 0 && searchBoxClasses?.searchBoxContainerFocused
        )}
      >
        <div
          className={twMerge(
            searchBoxClasses?.inputWrapper,
            focused && state.suggestions.length > 0 && searchBoxClasses?.inputWrapperFocused
          )}
        >
          <div className={searchBoxClasses?.searchIconWrapper} onClick={() => controller.submit()}>
            <SvgIcon icon="search" />
          </div>

          <input
            value={state.value}
            onChange={(e) => controller.updateText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                controller.submit();
              } else if (e.key === 'Escape') {
                (e.target as HTMLInputElement).blur();
              }
            }}
            onFocus={() => setFocused(true)}
            onBlur={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setFocused(false);
            }}
            placeholder={props.fields?.placeholderText.value}
            className={searchBoxClasses?.searchBoxInput}
            aria-label="searchbox"
          />
          {state.value && (
            <div
              className={searchBoxClasses?.closeIconWrapper}
              onMouseDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setFocused(false);
                controller.clear();
                controller.submit();
              }}
            >
              <SvgIcon icon="close" size="lg" />
            </div>
          )}
        </div>
        {focused && state.suggestions.length > 0 && (
          <ul className={searchBoxClasses?.suggestionsList}>
            {state.suggestions.map((suggestion) => {
              return (
                <li
                  key={suggestion.rawValue}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => controller.selectSuggestion(suggestion.rawValue)}
                  dangerouslySetInnerHTML={{ __html: suggestion.highlightedValue }}
                  className={searchBoxClasses?.suggestionItem}
                ></li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
