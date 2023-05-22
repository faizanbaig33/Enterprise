import {
  GraphQLClient,
  GraphQLRequestClient,
  SearchServiceConfig,
  SearchQueryService,
  getAppRootId,
} from '@sitecore-jss/sitecore-jss/graphql';
import { Debug, Errors, SitecoreIds } from 'lib/constants';

// The default query for request sitemaps
const defaultQuery = /* GraphQL */ `
  query SitemapQuery(
    $rootItemId: String!
    $language: String!
    $pageSize: Int = 100
    $hasLayout: String = "true"
    $after: String
    $baseTemplateId: String = "${SitecoreIds.Foundation.Core.BaseTemplates.Pages._BasePage}"
  ) {
    search(
      where: {
        AND: [
          { name: "excludeFromSitemap", value: "1", operator: NEQ }
          { name: "_path", value: $rootItemId, operator: CONTAINS }
          { name: "_language", value: $language }
          { name: "_hasLayout", value: $hasLayout }
          { name: "_templates", value: $baseTemplateId, operator: CONTAINS }
        ]
      }
      first: $pageSize
      after: $after
    ) {
      total
      pageInfo {
        endCursor
        hasNext
      }
      results {
        path
        url {
          path
          siteName
        }
        language {
          name
        }
        ... on _Sitemap {
          priority {
            ... on LookupField {
              targetItem {
                field(name: "Value") {
                  value
                }
              }
            }
          }
          changeFrequency {
            ... on LookupField {
              targetItem {
                field(name: "Value") {
                  value
                }
              }
            }
          }
        }
        ... on _BasePage {
          lastUpdated {
            value
          }
        }
      }
    }
  }
`;

export interface GraphQLSitemapXmlServiceConfig extends SearchServiceConfig {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;
  /**
   * The API key to use for authentication
   */
  apiKey: string;
  /**
   * The JSS application name
   */
  siteName: string;
  /**
   * The site language
   */
  language: string;
  /**
   * Optional. The template ID of a JSS App to use when searching for the appRootId.
   * @default '061cba1554744b918a0617903b102b82' (/sitecore/templates/Foundation/JavaScript Services/App)
   */
  jssAppTemplateId?: string;
}

/**
 * The schema of data returned in response to sitemaps request
 */
export type SitemapQueryResult = {
  lastUpdated?: {
    value: string;
  };
  url: {
    path: string;
    siteName: string;
  };
  language: {
    name: string;
  };
  priority: { targetItem?: { field: { value: string } } };
  changeFrequency: { targetItem?: { field: { value: string } } };
};

/**
 * The schema of data returned in response to sitemaps request
 */
export type SitemapPath = {
  siteName: string;
  language: string;
  path: string;
  lastUpdated?: string;
  priority: string;
  changeFrequency: string;
};

/**
 * Service that fetch the sitemaps data using Sitecore's GraphQL API.
 */
export class GraphQLSitemapXmlService {
  private graphQLClient: GraphQLClient;
  private searchService: SearchQueryService<SitemapQueryResult>;

  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL sitemaps service with the provided options
   * @param {GraphQLSitemapXmlServiceConfig} options instance
   */
  constructor(public options: GraphQLSitemapXmlServiceConfig) {
    this.graphQLClient = this.getGraphQLClient();
    this.searchService = new SearchQueryService<SitemapQueryResult>(this.graphQLClient);
  }

  /**
   * Fetch sitemap paths for generation of a sitemap
   * @returns an array of @see SitemapResult objects
   */
  async fetchPaths(): Promise<SitemapPath[]> {
    // If the caller does not specify a root item ID, then we try to figure it out
    const rootItemId =
      this.options.rootItemId ||
      (await getAppRootId(
        // @ts-ignore We want to use the searchService method from the SDK even though
        // it's private, it really shouldn't be. We do not want to override this.
        this.graphQLClient,
        this.options.siteName,
        this.options.language,
        this.options.jssAppTemplateId
      ));

    if (!rootItemId) {
      throw new Error(Errors.rootItemIdError);
    }

    // Fetch paths using all locales
    const paths = await this.searchService
      .fetch(this.query, {
        rootItemId,
        language: this.options.language,
        pageSize: this.options.pageSize,
      })
      .then((results: SitemapQueryResult[]) => {
        return results.map((result) => this.mapQueryResultToPath(result));
      });

    return paths;
  }

  /**
   * Map a query result to a path
   * @returns {SitemapPath} the sitemap path
   * @param {SitemapQueryResult} queryResult the query result to map
   */
  protected mapQueryResultToPath(queryResult: SitemapQueryResult): SitemapPath {
    return {
      siteName: queryResult.url.siteName,
      language: queryResult.language.name,
      path: queryResult.url.path,
      lastUpdated: queryResult.lastUpdated?.value,
      priority: queryResult.priority.targetItem?.field.value || '0.5',
      changeFrequency: queryResult.changeFrequency.targetItem?.field.value || 'Daily',
    };
  }

  /**
   * Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
   * library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
   * want to use something else.
   * @returns {GraphQLClient} implementation
   */
  protected getGraphQLClient(): GraphQLClient {
    return new GraphQLRequestClient(this.options.endpoint, {
      apiKey: this.options.apiKey,
      debugger: Debug.sitemapxml,
    });
  }
}
