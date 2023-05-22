import {
  InstantResultsState,
  loadSearchConfigurationActions,
  StandaloneSearchBoxState,
} from '@coveo/headless';
import {
  StandaloneSearchBox as StandaloneSearchBoxTypings,
  InstantResults as InstantResultsTypings,
} from '@coveo/headless/dist/definitions';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { twMerge } from 'tailwind-merge';

import { useTheme } from 'lib/context/ThemeContext';
import { FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { StandaloneSearchBoxTheme } from './StandaloneSearchBox.theme';
import { CoveoEngine, coveoEngineInstances } from 'lib/context/CoveoEngine';

type StandaloneSearchBoxProps = {
  standaloneSearchBoxClasses?: {
    [property: string]: string;
  };
  fields: Feature.EnterpriseWeb.Elements.Search.StandaloneSearchBox['fields'];
  toggleSearchBoxVisibility: React.Dispatch<SetStateAction<boolean>>;
};

export const StandaloneSearchBox: FunctionComponent<StandaloneSearchBoxProps> = (props) => {
  const { themeName, themeData } = useTheme(StandaloneSearchBoxTheme);

  const [redirectionTrigggered, setRedirectionTrigggered] = useState(false);

  const [standaloneSearchBoxState, setStandaloneSearchBoxState] =
    useState<StandaloneSearchBoxState>(
      coveoEngineInstances.standaloneEngine?.controllers.standaloneSearchBoxController
        ?.state as StandaloneSearchBoxState
    );

  const [instantResultsState, setInstantResultsState] = useState<InstantResultsState>(
    coveoEngineInstances.standaloneEngine?.controllers.instantResultsController
      ?.state as InstantResultsState
  );

  const context = useSitecoreContext();
  const router = useRouter();

  const [focused, setFocused] = useState(false);

  const { fields, toggleSearchBoxVisibility } = props;

  useEffect(() => {
    const allunsubscribers: { (): void }[] = [];

    (async () => {
      if (!coveoEngineInstances.standaloneEngine?.isStandaloneInitiated) {
        coveoEngineInstances.standaloneEngine = await CoveoEngine.build();

        coveoEngineInstances.standaloneEngine?.initiateSearchEngine(
          props,
          context.sitecoreContext.site?.name ?? '',
          context.sitecoreContext.language ?? '',
          true
        );

        const { updateSearchConfiguration } = loadSearchConfigurationActions(
          coveoEngineInstances.standaloneEngine?.headlessEngine
        );

        coveoEngineInstances.standaloneEngine?.headlessEngine.dispatch(
          updateSearchConfiguration({
            pipeline: fields?.queryPipeline?.value || 'sitesearch',
            searchHub: fields?.searchHub?.value || 'search',
          })
        );
      }
      subscribeToStateChangesAndReturnCleanup(allunsubscribers);
    })();
    return function cleanup() {
      allunsubscribers.forEach((unsub) => unsub?.());
    };
  }, []);

  useEffect(() => {
    if (redirectionTrigggered) {
      const { redirectTo, value, analytics } = coveoEngineInstances.standaloneEngine?.controllers
        .standaloneSearchBoxController?.state as StandaloneSearchBoxState;

      const data = { value, analytics };
      localStorage.setItem('coveo_standalone_search_box_data', JSON.stringify(data));

      toggleSearchBoxVisibility(false);
      setRedirectionTrigggered(false);

      router.push({
        pathname: redirectTo || fields?.redirectionUrl.value.href,
        query: { searchQuery: value },
      });
    }
  }, [redirectionTrigggered]);

  const subscribeToStateChangesAndReturnCleanup = (unsubscribers: Array<any>) => {
    // Subscribe to standalone search controller
    unsubscribers?.push(
      (
        coveoEngineInstances.standaloneEngine?.controllers
          .standaloneSearchBoxController as StandaloneSearchBoxTypings
      )?.subscribe(() => {
        setStandaloneSearchBoxState(
          coveoEngineInstances.standaloneEngine?.controllers.standaloneSearchBoxController
            .state as StandaloneSearchBoxState
        );
      })
    );
    // Subscribe to instant results controller
    unsubscribers?.push(
      (
        coveoEngineInstances.standaloneEngine?.controllers
          .instantResultsController as InstantResultsTypings
      )?.subscribe(() =>
        setInstantResultsState(
          coveoEngineInstances.standaloneEngine?.controllers.instantResultsController
            .state as InstantResultsState
        )
      )
    );
  };

  const controller = coveoEngineInstances.standaloneEngine?.controllers
    .standaloneSearchBoxController as StandaloneSearchBoxTypings;

  const instantResultsController = coveoEngineInstances.standaloneEngine?.controllers
    .instantResultsController as InstantResultsTypings;

  function isEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
    return e.key === 'Enter';
  }

  if (!standaloneSearchBoxState) {
    return null;
  }

  return (
    <div
      className={twMerge(
        themeData.classes?.standaloneSearchBoxContainer,
        focused &&
          standaloneSearchBoxState.suggestions.length > 0 &&
          themeData.classes?.standaloneFocusedClasses
      )}
    >
      <div className={themeData.classes?.standaloneSearchBoxWrapper}>
        {/* Search icon */}
        <div
          className={themeData.classes?.searchIconWrapper}
          onMouseDown={() => {
            controller.submit();
            setRedirectionTrigggered(true);
          }}
        >
          <SvgIcon icon="search" />
        </div>
        <div className={themeData.classes?.searchBox}>
          <input
            className={themeData.classes?.searchBoxInput}
            value={standaloneSearchBoxState.value}
            onChange={(e) => {
              controller.updateText(e.target.value);
              instantResultsController.updateQuery(e.target.value);
            }}
            onKeyDown={(e) => {
              if (isEnterKey(e)) {
                controller.submit();
                setRedirectionTrigggered(true);
                setFocused(false);
              }
            }}
            onFocus={() => setFocused(true)}
            onBlur={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setFocused(false);
            }}
            placeholder={fields?.placeholderText.value}
          />
          {/* Close icon */}
          {standaloneSearchBoxState.value && (
            <div
              className={themeData.classes?.closeIconWrapper}
              onMouseDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
                controller.clear();
              }}
            >
              <SvgIcon icon="close" size={themeName === 'aw' ? 'xl' : 'lg'} />
            </div>
          )}
        </div>
      </div>
      {focused && standaloneSearchBoxState.suggestions.length > 0 && (
        <div className={themeData.classes?.omniResultsWrapper}>
          {/* Standalone search suggestions */}
          <ul className={themeData.classes?.suggestionsWrapper}>
            {standaloneSearchBoxState.suggestions.map((suggestion) => {
              const value = suggestion.rawValue;
              return (
                <li
                  key={value}
                  onMouseDown={() => {
                    controller.selectSuggestion(value);
                    setRedirectionTrigggered(true);
                  }}
                  dangerouslySetInnerHTML={{ __html: suggestion.highlightedValue }}
                  className={themeData.classes?.suggestionItem}
                ></li>
              );
            })}
          </ul>

          {/* Instant results suggestions */}
          {instantResultsState.results.length > 0 && (
            <>
              <p className={themeData.classes?.instantResultsTitle}>
                {fields?.suggestedResultsLabel.value}
              </p>
              <ul className={themeData.classes?.instantResultsWrapper}>
                {instantResultsState.results.map((result) => {
                  return (
                    <li
                      key={result.uniqueId}
                      className={themeData.classes?.suggestionItem}
                      onMouseDown={() => {
                        router.push(result.clickUri);
                      }}
                    >
                      <Link href={result.clickUri}>{result.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};
