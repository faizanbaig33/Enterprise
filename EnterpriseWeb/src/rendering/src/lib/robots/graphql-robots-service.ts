import { GraphQLClient, GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';
import { SearchQueryService } from 'lib/graphql';
//import { siteNameError } from '@sitecore-jss/sitecore-jss/constants';
import { Debug, Errors } from 'lib/constants';
import {} from 'lib/utils/linq';

// The default query for request robots.txt
const defaultQuery = /* GraphQL */ `
  query RobotsQuery($siteName: String!, $after: String) {
    search(
      where: {
        AND: [
          { name: "_templates", value: "E46F3AF2-39FA-4866-A157-7017C4B2A40C", operator: CONTAINS }
          { name: "_path", value: "0DE95AE4-41AB-4D01-9EB0-67441B7C2450", operator: CONTAINS }
          { name: "siteName", value: $siteName, operator: EQ }
        ]
      }
      after: $after
    ) {
      total
      pageInfo {
        endCursor
        hasNext
      }
      results {
        siteGrouping: parent {
          siteSettings: parent {
            ... on _RobotsContent {
              robots: robotsContent {
                value
              }
            }
          }
        }
      }
    }
  }
`;

export type GraphQLRobotsServiceConfig = {
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
};

/**
 * The schema of data returned in response to robots.txt request
 */
export type RobotsQueryResult = { siteGrouping: { siteSettings: { robots: { value: string } } } };

/**
 * Service that fetch the robots.txt data using Sitecore's GraphQL API.
 */
export class GraphQLRobotsService {
  private graphQLClient: GraphQLClient;
  private searchService: SearchQueryService<RobotsQueryResult>;

  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL robots.txt service with the provided options
   * @param {GraphQLRobotsServiceConfig} options instance
   */
  constructor(public options: GraphQLRobotsServiceConfig) {
    this.graphQLClient = this.getGraphQLClient();
    this.searchService = new SearchQueryService<RobotsQueryResult>(this.graphQLClient);
  }

  /**
   * Fetch a data of robots.txt from API
   * @returns text of robots.txt
   * @throws {Error} if the siteName is empty.
   */
  async fetchRobots(): Promise<string> {
    const siteName: string = this.options.siteName;

    if (!siteName) {
      throw new Error(Errors.siteNameError);
    }

    const robotsResult = this.searchService.fetch(this.query, { siteName });
    try {
      return robotsResult.then((result: RobotsQueryResult[]) => {
        return result?.firstOrDefault()?.siteGrouping?.siteSettings?.robots?.value || '';
      });
    } catch (e) {
      return Promise.reject(e);
    }
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
      debugger: Debug.robots,
    });
  }
}
