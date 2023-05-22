import {
  buildDidYouMean,
  buildQuerySummary,
  buildResultList,
  buildResultsPerPage,
  buildSearchBox,
  buildSearchEngine,
  SearchEngine,
  buildResultTemplatesManager,
  buildFacet,
  buildPager,
  buildBreadcrumbManager,
  buildSearchStatus,
  buildNotifyTrigger,
  StandaloneSearchBox,
  buildStandaloneSearchBox,
  InstantResults,
  buildInstantResults,
  loadAdvancedSearchQueryActions,
  buildUrlManager,
  UrlManager,
} from '@coveo/headless';
import {
  BreadcrumbManager,
  DidYouMean,
  Facet,
  FacetSortCriterion,
  Pager,
  QuerySummary,
  Result,
  ResultList,
  ResultTemplatesManager,
  SearchBox,
  SearchStatus,
} from '@coveo/headless/dist/definitions/insight.index';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { setCookie, getCookie } from 'cookies-next';
import { getEnum } from 'lib/utils';
import { EnumField } from 'lib/utils/get-enum';
import { SearchProps } from 'components/search/Search/Search';
import { getBreakpoint } from 'lib/utils/get-screen-type';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';

const getVisiblePagerNumbers = (
  fields: Feature.EnterpriseWeb.Elements.Search.Pager['fields']
): number => {
  return window.outerWidth < getBreakpoint('md')
    ? fields?.numberOfPagesMobile.value ?? 3
    : fields?.numberOfPages.value ?? 5;
};

interface FacetControllerTypes {
  [key: string]: {
    facet: Facet;
    dependsOn: string | null;
  };
}

export class CoveoEngine {
  public siteName!: string;
  public language!: string;
  public headlessEngine!: SearchEngine;
  public isStandaloneInitiated!: boolean;
  public isEngineInitiated!: boolean;
  public resultTemplateManager!: ResultTemplatesManager<(result: Result) => JSX.Element>;
  public controllers: {
    [controller: string]:
      | SearchBox
      | StandaloneSearchBox
      | InstantResults
      | ResultList
      | QuerySummary
      | FacetControllerTypes
      | Pager
      | SearchStatus
      | BreadcrumbManager
      | DidYouMean;
  };

  constructor(searchToken: string) {
    if (searchToken) {
      this.headlessEngine = buildSearchEngine({
        configuration: {
          organizationId:
            process.env.NEXT_PUBLIC_COVEO_ORGANIZATION_ID || 'andersencorporationsandbox',
          accessToken: searchToken,
          renewAccessToken: async () => {
            const searchToken = await CoveoEngine.getSearchToken();
            setCookie('searchToken', searchToken);
            return searchToken;
          },
        },
      });
      setCookie('searchToken', searchToken);
      this.isEngineInitiated = false;
      this.isStandaloneInitiated = false;
    }
    this.controllers = {};
    return this;
  }

  public static async build(): Promise<CoveoEngine> {
    let searchToken: string = getCookie('searchToken')?.toString() || '';

    if (!searchToken) {
      searchToken = await CoveoEngine.getSearchToken();
    }

    return new CoveoEngine(searchToken as string);
  }

  static getSearchToken = async (): Promise<string> => {
    const payload = JSON.stringify({
      userIds: [
        {
          name: 'anonymous',
          provider: 'Email Security Provider',
        },
      ],
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_COVEO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: payload,
    };

    const response = await fetch(
      'https://platform.cloud.coveo.com/rest/search/v2/token?organizationid=andersencorporationsandbox',
      requestOptions
    );

    const data = await response.json();
    return data.token;
  };

  async initiateSearchEngine(
    props: SearchProps | Feature.EnterpriseWeb.Elements.Search.StandaloneSearchBox,
    siteName: string,
    language: string,
    isStandaloneSearch = false
  ) {
    // If engine is being initiated first time then update search queries
    if (!this.isStandaloneInitiated && !this.isEngineInitiated) {
      const { updateAdvancedSearchQueries } = loadAdvancedSearchQueryActions(this.headlessEngine);
      this.headlessEngine.dispatch(
        updateAdvancedSearchQueries({
          cq: `(@ew_excludefromsearch=="false") AND (@ew_sitename==${siteName} OR @ew_document_site=${siteName}) AND (@ew_sitelanguage==${language}) AND (@source==EnterpriseWeb-${process.env.NEXT_PUBLIC_COVEO_FARM_NAME})`,
        })
      );
    }
    if (isStandaloneSearch) {
      const { fields } = props as Feature.EnterpriseWeb.Elements.Search.StandaloneSearchBox;
      if (fields) {
        this.buildStandaloneSearchBoxController(
          fields.numberOfSuggestions.value,
          fields.showSuggestions.value,
          fields.redirectionUrl.value.href ?? ''
        );
        this.buildInstantResultsController(
          fields.numberOfSuggestedResults.value,
          fields.showSuggestedResults.value
        );
        this.isStandaloneInitiated = true;
      }
    } else {
      const { fields } = props as SearchProps;
      this.resultTemplateManager = buildResultTemplatesManager(this.headlessEngine);
      this.buildBreadcrumbController();
      this.buildSearchBoxController(
        fields.searchBox.fields.numberOfSuggestions.value || 5,
        fields.searchBox.fields.showSuggestions.value
      );
      this.buildResultListController(fields.searchParameters.fields.numberOfResultsPerPage.value);
      this.buildQuerySummaryController();
      this.buildSearchStatusController();
      this.buildDidYouMeanController();
      this.buildPagerController(getVisiblePagerNumbers(fields.pager.fields));
      fields.facets.forEach(
        (
          facet: Feature.EnterpriseWeb.Elements.Search.Facet & {
            fields: {
              dependsOn?: Feature.EnterpriseWeb.Elements.Search.Facet;
            };
          }
        ) => {
          facet.fields &&
            this.buildFacetController(
              facet.fields.facetField,
              facet.fields.uniqueIdentifier,
              facet.fields.numberOfValues.value,
              facet.fields.sortCriteria,
              facet.fields?.dependsOn?.fields?.uniqueIdentifier.value
            );
        }
      );
      this.isEngineInitiated = true;
    }
  }

  buildUrlManagerController(): { urlManager: UrlManager; fragment: () => string } {
    const fragment = () => window.location.hash.slice(1);

    const urlManager = buildUrlManager(this.headlessEngine, {
      initialState: { fragment: fragment() },
    });
    const onHashChange = () => {
      urlManager.synchronize(fragment());
    };

    window.addEventListener('hashchange', onHashChange);

    return { urlManager, fragment };
  }

  buildResultListController(resultsPerPage: number) {
    buildResultsPerPage(this.headlessEngine, {
      initialState: { numberOfResults: resultsPerPage ?? 15 },
    });

    this.controllers['resultListController'] = buildResultList(this.headlessEngine);
  }

  buildQuerySummaryController() {
    this.controllers['querySummaryController'] = buildQuerySummary(this.headlessEngine);
  }

  buildDidYouMeanController() {
    this.controllers['didYouMean'] = buildDidYouMean(this.headlessEngine);
  }

  buildNotifyTriggerController() {
    return buildNotifyTrigger(this.headlessEngine);
  }

  buildStandaloneSearchBoxController(
    numberOfSuggestions: number,
    showSuggestions: boolean,
    redirectionUrl: string
  ) {
    if (showSuggestions) {
      this.controllers['standaloneSearchBoxController'] = buildStandaloneSearchBox(
        this.headlessEngine,
        {
          options: {
            id: 'standaloneSearchBox',
            redirectionUrl: redirectionUrl,
            numberOfSuggestions: numberOfSuggestions,
            highlightOptions: {
              exactMatchDelimiters: {
                open: '<strong class="text-black">',
                close: '</strong>',
              },
            },
          },
        }
      );
    }
  }

  buildSearchBoxController(numberOfSuggestions: number, showSuggestions: boolean) {
    if (showSuggestions) {
      this.controllers['searchBoxController'] = buildSearchBox(this.headlessEngine, {
        options: {
          clearFilters: false,
          numberOfSuggestions: numberOfSuggestions,
          highlightOptions: {
            exactMatchDelimiters: {
              open: '<strong class="text-black">',
              close: '</strong>',
            },
          },
        },
      });
    }
  }

  buildInstantResultsController(numberOfSuggestedResults: number, showSuggestedResults: boolean) {
    if (showSuggestedResults) {
      this.controllers['instantResultsController'] = buildInstantResults(this.headlessEngine, {
        options: {
          maxResultsPerQuery: numberOfSuggestedResults,
        },
      });
    }
  }

  buildSearchStatusController() {
    this.controllers['searchStatusController'] = buildSearchStatus(this.headlessEngine);
  }

  buildFacetController(
    facetField: EnumField<string> | undefined,
    uniqueIdentifier: Field<string> | undefined,
    numberOfValues: number,
    facetSortCriteria: EnumField<FacetSortCriterion> | undefined,
    dependsOn: string | undefined
  ) {
    const field = getEnum<string>(facetField) || '';
    const facetId = uniqueIdentifier?.value || '';
    const sortCriteria = getEnum<FacetSortCriterion>(facetSortCriteria) || 'automatic';
    const facetController = buildFacet(this.headlessEngine, {
      options: {
        field: field,
        facetId: facetId,
        sortCriteria: sortCriteria,
        numberOfValues: numberOfValues || 8,
      },
    });
    if (this.controllers['facetController']) {
      this.controllers['facetController'] = {
        ...this.controllers['facetController'],
        [facetController?.state?.facetId]: {
          facet: facetController,
          dependsOn: dependsOn ?? null,
        },
      } as FacetControllerTypes;
    } else {
      this.controllers['facetController'] = new Object({
        [facetController?.state?.facetId]: {
          facet: facetController,
          dependsOn: dependsOn ?? null,
        },
      }) as FacetControllerTypes;
    }
  }

  buildPagerController(numberOfPages: number) {
    this.controllers['pagerController'] = buildPager(this.headlessEngine, {
      options: { numberOfPages: numberOfPages },
    });
  }

  buildBreadcrumbController() {
    this.controllers['breadcrumbManager'] = buildBreadcrumbManager(this.headlessEngine);
  }

  initiateResultTemplatesManager(): ResultTemplatesManager<(result: Result) => JSX.Element> {
    return buildResultTemplatesManager(this.headlessEngine);
  }
}

export const coveoEngineInstances: {
  standaloneEngine: CoveoEngine;
  searchPageEngine: CoveoEngine;
} = {
  standaloneEngine: new CoveoEngine(''),
  searchPageEngine: new CoveoEngine(''),
};
