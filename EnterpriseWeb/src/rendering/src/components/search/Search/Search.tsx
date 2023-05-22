// Global
import { useEffect, useState } from 'react';
// Components
import { SearchBox } from 'src/helpers/Coveo/SearchBox/SearchBox';
import {
  loadSearchAnalyticsActions,
  loadSearchActions,
  ResultListState,
  loadSearchConfigurationActions,
  loadQueryActions,
  Unsubscribe,
} from '@coveo/headless';
import { useRouter } from 'next/router';
import {
  SearchBox as SearchBoxTypings,
  QuerySummary as QuerySummaryTypings,
  ResultList as ResultListTypings,
  Pager as PagerTypings,
  DidYouMean as DidYouMeanTypings,
} from '@coveo/headless/dist/definitions';
import classNames from 'classnames';
import { ResultList } from 'src/helpers/Coveo/ResultList/ResultList';
import { Pager } from 'src/helpers/Coveo/Pager/Pager';
import { useTheme } from 'lib/context/ThemeContext';
import { SearchTheme } from './Search.theme';
import { Component } from 'src/helpers/Component';
import { QuerySummary } from 'src/helpers/Coveo/QuerySummary/QuerySummary';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import {
  GridStyle,
  LayoutType,
  registerTemplates,
} from 'src/helpers/Coveo/ResultTemplatesManager/ResultTemplatesManager';
import { Headline } from 'src/helpers/Headline';
import SingleButton from 'src/helpers/SingleButton/SingleButton';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import FacetGroup from 'src/helpers/Coveo/Facet/FacetGroup';
import { BodyCopy } from 'src/helpers/BodyCopy';
import { TriggeredBanner } from 'src/helpers/Coveo/TriggeredBanner/TriggeredBanner';
import { CoveoEngine, coveoEngineInstances } from 'lib/context/CoveoEngine';
import { getEnum } from 'lib/utils';
import { DidYouMean } from 'src/helpers/Coveo/DidYouMean/DidYouMean';

export type SearchProps = Feature.EnterpriseWeb.Components.Search.Search & {
  fields: {
    searchBox: Feature.EnterpriseWeb.Elements.Search.SearchBox;
    pager: Feature.EnterpriseWeb.Elements.Search.Pager;
    facets: Array<Feature.EnterpriseWeb.Elements.Search.Facet>;
    searchParameters: Feature.EnterpriseWeb.Elements.Search.SearchParameters;
    resultItems: Feature.EnterpriseWeb.Elements.Search.ListResultItem[];
    columns: Feature.EnterpriseWeb.Elements.Search.ResultColumn[];
    didYouMean: Feature.EnterpriseWeb.Elements.Search.DidYouMean;
  };
};

const Search = (props: SearchProps) => {
  const { themeName, themeData } = useTheme(SearchTheme);
  const { fields } = props;
  const context = useSitecoreContext();
  const router = useRouter();

  const [resultListState, setResultListState] = useState<ResultListState>(
    coveoEngineInstances.searchPageEngine.controllers.resultListController?.state as ResultListState
  );

  const resultLayout = getEnum<LayoutType>(fields.resultLayout);
  const isFacetsAvailable = fields.facets.length > 0;

  const subscribeToStateChangesAndReturnCleanup = (unsubscribers: Array<any>) => {
    unsubscribers?.push(
      (
        coveoEngineInstances.searchPageEngine.controllers.resultListController as ResultListTypings
      )?.subscribe(() =>
        setResultListState(
          coveoEngineInstances.searchPageEngine.controllers.resultListController
            .state as ResultListState
        )
      )
    );
  };

  useEffect(() => {
    const allunsubscribers: { (): void }[] = [];
    let urlManagerUnsubscriber: Unsubscribe;

    (async () => {
      coveoEngineInstances.searchPageEngine.isEngineInitiated = false;
      coveoEngineInstances.searchPageEngine = await CoveoEngine.build();

      coveoEngineInstances.searchPageEngine.initiateSearchEngine(
        props,
        context.sitecoreContext.site?.name ?? '',
        context.sitecoreContext.language ?? 'en'
      );

      const { urlManager, fragment } =
        coveoEngineInstances.searchPageEngine.buildUrlManagerController();

      const onHashChange = () => {
        urlManager.synchronize(fragment());
      };

      window.addEventListener('hashchange', onHashChange);

      urlManagerUnsubscriber = urlManager.subscribe(() => {
        const searchParams = new URLSearchParams(urlManager.state.fragment);

        searchParams.delete('cq');

        const hash = `#${searchParams.toString()}`;
        history.pushState(null, document.title, hash);
      });

      registerTemplates(
        coveoEngineInstances.searchPageEngine.resultTemplateManager,
        getLayoutClasses(),
        props,
        resultLayout || 'list',
        resultLayout === 'grid' ? getEnum<GridStyle>(fields.gridStyle) : undefined
      );

      const { updateSearchConfiguration } = loadSearchConfigurationActions(
        coveoEngineInstances.searchPageEngine.headlessEngine
      );

      coveoEngineInstances.searchPageEngine.headlessEngine.dispatch(
        updateSearchConfiguration({
          pipeline: fields.searchParameters?.fields.queryPipeline.value,
          searchHub: fields.searchParameters?.fields.searchHub.value,
        })
      );
      fetchResultsFromStandaloneQuery();
      subscribeToStateChangesAndReturnCleanup(allunsubscribers);
    })();

    return function cleanup() {
      allunsubscribers.forEach((unsub) => unsub?.());
      urlManagerUnsubscriber();
    };
  }, []);

  // Whenever searchQuery in url changes, we need to execute search
  useEffect(() => {
    if (coveoEngineInstances.searchPageEngine.isEngineInitiated) fetchResultsFromStandaloneQuery();
  }, [router.query.searchQuery]);

  const getLayoutClasses = () => {
    switch (resultLayout) {
      case 'list':
        return themeData.classes.resultListClasses;
      case 'table':
        return themeData.classes.documentListClasses;
      case 'grid':
        return themeData.classes.gridLayoutClasses;
      default:
        return themeData.classes.resultListClasses;
    }
  };

  const fetchResultsFromStandaloneQuery = () => {
    const data = JSON.parse(localStorage.getItem('coveo_standalone_search_box_data') || '{}');

    if (data && data.value) {
      localStorage.removeItem('coveo_standalone_search_box_data');
      const { value, analytics } = data;

      const { cause, metadata } = analytics;

      const { logSearchFromLink, logOmniboxFromLink } = loadSearchAnalyticsActions(
        coveoEngineInstances.searchPageEngine.headlessEngine
      );

      const event = cause === 'searchFromLink' ? logSearchFromLink() : logOmniboxFromLink(metadata);
      dispatchQuery(true, value, event);
    } else {
      dispatchQuery(false);
    }
  };

  const dispatchQuery = (isStandaloneSearchQuery: boolean, query = '', event: any = '') => {
    const { executeSearch } = loadSearchActions(
      coveoEngineInstances.searchPageEngine.headlessEngine
    );

    if (isStandaloneSearchQuery) {
      const { updateQuery } = loadQueryActions(
        coveoEngineInstances.searchPageEngine.headlessEngine
      );

      coveoEngineInstances.searchPageEngine.headlessEngine.dispatch(updateQuery({ q: query }));
      coveoEngineInstances.searchPageEngine.headlessEngine.dispatch(executeSearch(event));
    } else {
      const { logInterfaceLoad } = loadSearchAnalyticsActions(
        coveoEngineInstances.searchPageEngine.headlessEngine
      );

      coveoEngineInstances.searchPageEngine.headlessEngine.dispatch(
        executeSearch(logInterfaceLoad())
      );
    }
  };

  const renderNoResults = () => {
    const noResultsHeadlineText = `${fields.searchParameters.fields.noResultsHeadline.value} ${
      coveoEngineInstances.searchPageEngine.headlessEngine.state.query?.q &&
      `for "${coveoEngineInstances.searchPageEngine.headlessEngine.state.query?.q}"`
    }`;

    return (
      <>
        <Headline
          classes={themeData.classes.resultListClasses.noResultsHeadline ?? ''}
          useTag="h2"
          fields={{
            headlineText: { value: noResultsHeadlineText },
            superscriptCTA: {
              value: {
                href: '',
              },
            },
          }}
        />
        <BodyCopy classes="" fields={{ body: fields.searchParameters.fields.noResultsBody }} />
        <TriggeredBanner
          triggeredBannerClasses={themeData.classes.triggeredBannerClasses}
          controller={coveoEngineInstances.searchPageEngine.buildNotifyTriggerController()}
        />
      </>
    );
  };

  if (!fields) {
    return null;
  }

  return (
    <Component variant="lg" padding="px-m lg:px-0" dataComponent="search/searchhero" {...props}>
      {coveoEngineInstances.searchPageEngine.isEngineInitiated && (
        <>
          <div className="col-span-12">
            <div className={themeName === 'rba' ? 'mx-[calc(50%-50vw)] bg-secondary px-m' : ''}>
              <div className={themeData.classes.heroSearchContentWrapper}>
                <Headline classes={themeData.classes.headline} {...props} />
                <div className={themeData.classes.ctaWrapper}>
                  <SingleButton {...props} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <SearchBox
              controller={
                coveoEngineInstances.searchPageEngine.controllers
                  .searchBoxController as SearchBoxTypings
              }
              searchBoxClasses={themeData.classes.searchBoxClasses}
              fields={fields.searchBox.fields}
            />
          </div>
          {resultListState?.hasResults ? (
            <>
              {isFacetsAvailable && (
                <div className="col-span-12 hidden ml:col-span-3 ml:block">
                  <FacetGroup {...props} themeData={themeData} />
                </div>
              )}
              <div className={classNames('col-span-12', isFacetsAvailable && 'ml:col-span-9')}>
                <DidYouMean
                  controller={
                    coveoEngineInstances.searchPageEngine.controllers
                      .didYouMean as DidYouMeanTypings
                  }
                  didYouMeanClasses={themeData.classes.didYouMeanClasses}
                  didYouMeanProps={fields?.didYouMean}
                />
                <div className="mb-xxs flex items-end justify-between">
                  <QuerySummary
                    controller={
                      coveoEngineInstances.searchPageEngine.controllers
                        .querySummaryController as QuerySummaryTypings
                    }
                    querySummaryClasses={themeData.classes.querySummaryClasses}
                  />
                  <div className="ml:hidden">
                    <FacetGroup {...props} themeData={themeData} />
                  </div>
                </div>
                <TriggeredBanner
                  triggeredBannerClasses={themeData.classes.triggeredBannerClasses}
                  controller={coveoEngineInstances.searchPageEngine.buildNotifyTriggerController()}
                />
                <ResultList
                  controller={
                    coveoEngineInstances.searchPageEngine.controllers
                      .resultListController as ResultListTypings
                  }
                  resultTemplatesManager={
                    coveoEngineInstances.searchPageEngine.resultTemplateManager
                  }
                  resultListClasses={getLayoutClasses()}
                  layoutType={resultLayout}
                  gridStyle={
                    resultLayout === 'grid' ? getEnum<GridStyle>(fields.gridStyle) : 'photo-gallery'
                  }
                  columns={fields.columns}
                  resultItems={
                    resultLayout === 'grid'
                      ? (fields.gridResultItems as unknown as Feature.EnterpriseWeb.Elements.Search.GridResultItem[])
                      : undefined
                  }
                />
                <Pager
                  pagerClasses={themeData.classes.pagerClasses}
                  controller={
                    coveoEngineInstances.searchPageEngine.controllers
                      .pagerController as PagerTypings
                  }
                />
              </div>
            </>
          ) : (
            <div className="col-span-12 px-m md:px-xxl">{renderNoResults()}</div>
          )}
        </>
      )}
    </Component>
  );
};

export default Search;
