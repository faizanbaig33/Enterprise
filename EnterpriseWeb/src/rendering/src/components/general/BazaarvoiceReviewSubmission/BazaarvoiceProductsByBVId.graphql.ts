import { GraphQLClient, GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';
import { Debug } from 'lib/constants';
import { SearchQueryService } from 'lib/graphql';
import config from 'temp/config';

const ProductByBVIdQuery = (sourceIds: string[], productIds: string[]) => {
  /* GraphQL */
  return `
  query ProductByBVIdQuery($after: String) {
    search(
      where: {
        AND: [
          {
            OR: [
              ${SourceIdQueryFormat(sourceIds)}
            ]
          }
          {
            OR: [
              ${BVProductIdQueryFormat(productIds)}
            ]
          }
        ]
      }
      after: $after
    ) {
      total
      pageInfo {
        endCursor
        hasNext
      }
      results{
         ... on Product {
           bazaarvoiceProductId {
             value
           }
          productName{
             value
          }
          productImage {
            src,
            height,
            width,
            alt
          }
       	}
      }
    }
  }
`;
};

const SourceIdQueryFormat = (sourceIds: string[]) => {
  return sourceIds.reduce(
    (left, right) => left + `{ name: "_path", value: "${right}", operator: CONTAINS }`,
    ''
  );
};

const BVProductIdQueryFormat = (productIds: string[]) => {
  return productIds.reduce(
    (left, right) => left + `{ name: "bazaarvoiceProductId", value: "${right}", operator: EQ }`,
    ''
  );
};

/**
 * The schema for the product data coming back from the graphQl query.
 */
export type BazaarvoiceReviewSubmissionQueryResult = {
  bazaarvoiceProductId: { value: string };
  productName: { value: string };
  productImage: {
    src: string;
    height: string;
    width: string;
    alt: string;
  };
};

/**
 * Service that fetch the product data using Sitecore's GraphQL API.
 */
export class GraphQLBVProductIdService {
  private graphQLClient: GraphQLClient;
  private searchService: SearchQueryService<BazaarvoiceReviewSubmissionQueryResult>;

  protected getQuery(sourceIds: string[], productIds: string[]): string {
    return ProductByBVIdQuery(sourceIds, productIds);
  }

  /**
   * Creates an instance of graphQL BVProductId service with the provided options
   */
  constructor() {
    this.graphQLClient = this.getGraphQLClient();
    this.searchService = new SearchQueryService<BazaarvoiceReviewSubmissionQueryResult>(
      this.graphQLClient
    );
  }

  /**
   * Fetch a set of products from the global product data using the set of Bazaarvoice productIds
   * @returns an array of the products matching the Bazaarvoice productIds
   */
  async getProductsByBVProductId(
    sourceIds: string[],
    productIds: string[]
  ): Promise<BazaarvoiceReviewSubmissionQueryResult[]> {
    try {
      const productsByBVProductIdResults = this.searchService.fetch(
        this.getQuery(sourceIds, productIds),
        {}
      );
      return productsByBVProductIdResults;
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
    return new GraphQLRequestClient(config.graphQLEndpoint, {
      apiKey: config.sitecoreApiKey,
      debugger: Debug.productsByBVProductId,
    });
  }
}
