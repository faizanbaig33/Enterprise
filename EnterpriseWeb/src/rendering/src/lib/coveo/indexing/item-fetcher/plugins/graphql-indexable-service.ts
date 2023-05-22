import { GraphQLClient, GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';
import { SearchQueryService, SearchServiceConfig } from '@sitecore-jss/sitecore-jss/graphql';
import { Debug, SitecoreIds } from 'lib/constants';
import config from 'temp/config';
import { IndexableItem, IndexableFields } from '../..';

const sitecoreContentNodeId = '0DE95AE4-41AB-4D01-9EB0-67441B7C2450';

// The default query for coveo sitemap
const defaultQuery = /* GraphQL */ `
  query IndexableQuery($after: String) {
    search(
      where: {
        AND: [
          {
            name: "_templates"
            value: "${SitecoreIds.Foundation.Core.FieldSets.Search._IndexableItem}"
            operator: CONTAINS
          }
					{
            name: "_path"
            value: "${sitecoreContentNodeId}"
            operator: CONTAINS
          }
        ]
      }
      first: 100
      after: $after
    ) {
      total
      pageInfo {
        endCursor
        hasNext
      }
      results {
        id
        name
        language {
          name
        }
        parent {
          id
        }
        path
        url {
          path
          siteName
        }
        version
        template {
          id
          name
          baseTemplates {
            id
          }
        }
        ancestors {
          id
        }
        fields(ownFields: false) {
          ...ValueFields
          ...LinkFields
        }
      }
    }
  }

  fragment ValueFields on ItemField {
    name
    __typename
    ... on RichTextField {
      value
    }
    ... on NumberField {
      numberValue
    }
    ... on NameValueListField {
      values {
        name
        value
      }
    }
    ... on LinkField {
      anchor
      className
      linkType
      queryString
      text
      url
    }
    ... on TextField {
      value
    }
    ... on IntegerField {
      intValue
    }
    ... on ImageField {
      alt
      height
      width
      src
    }
    ... on FileField{
      documentUrl: jsonValue
    }
    ... on DateField {
      value
    }
    ... on CheckboxField {
      boolValue
    }
  }

  fragment LinkFields on ItemField {
    ... on MultilistField {
      targetItems {
        id
        name
        url {
          path
        }
        fields {
          ...ValueFields
        }
      }
    }
    ... on LookupField {
      targetItem {
        id
        name
        fields {
          ...ValueFields
        }
      }
    }
  }
`;

type IndexableQueryResultField = {
  name: string;
  __typename: string;
};

type IndexableQueryResultRichTextField = IndexableQueryResultField & {
  value: string;
};

type IndexableQueryResultNumberField = IndexableQueryResultField & {
  numberValue: number;
};

type IndexableQueryResultNameValueListField = IndexableQueryResultField & {
  values: {
    name: string;
    value: string;
  }[];
};

type IndexableQueryResultMultilistField = IndexableQueryResultField & {
  targetItems: {
    id: string;
    name: string;
    url: {
      path: string;
    };
    fields: IndexableQueryResultFields[];
  }[];
};

type IndexableQueryResultLookupField = IndexableQueryResultField & {
  targetItem: {
    id: string;
    name: string;
    fields: IndexableQueryResultFields[];
  };
};

type IndexableQueryResultLinkField = IndexableQueryResultField & {
  anchor: string;
  className: string;
  linkType: string;
  queryString: string;
  text: string;
  url: string;
};

type IndexableQueryResultTextField = IndexableQueryResultField & {
  value: string;
};

type IndexableQueryResultIntegerField = IndexableQueryResultField & {
  intValue: number;
};

type IndexableQueryResultImageField = IndexableQueryResultField & {
  alt: string;
  height: string;
  width: string;
  src: string;
};

type IndexableQueryResultDateField = IndexableQueryResultField & {
  value: string;
};

type IndexableQueryResultChecbokField = IndexableQueryResultField & {
  boolValue: boolean;
};

type IndexableQueryResultFields =
  | IndexableQueryResultRichTextField
  | IndexableQueryResultNumberField
  | IndexableQueryResultNameValueListField
  | IndexableQueryResultMultilistField
  | IndexableQueryResultLookupField
  | IndexableQueryResultLinkField
  | IndexableQueryResultTextField
  | IndexableQueryResultIntegerField
  | IndexableQueryResultImageField
  | IndexableQueryResultDateField
  | IndexableQueryResultChecbokField;

/**
 * The schema of data returned in response to sitemaps request
 */
type IndexableQueryResult = {
  id: string;
  name: string;
  language: {
    name: string;
  };
  parent: {
    id: string;
  };
  path: string;
  url: {
    path: string;
    siteName: string;
  };
  version: number;
  template: {
    id: string;
    name: string;
    baseTemplates: {
      id: string;
    }[];
  };
  ancestors: {
    id: string;
  }[];
  fields: IndexableQueryResultFields[];
};

// function isRichTextField(
//   field: IndexableQueryResultFields
// ): field is IndexableQueryResultRichTextField {
//   return field.__typename == 'RichTextField';
// }

// function isNumberField(
//   field: IndexableQueryResultFields
// ): field is IndexableQueryResultNumberField {
//   return field.__typename == 'NumberField';
// }

// function isNameValueListField(
//   field: IndexableQueryResultFields
// ): field is IndexableQueryResultNameValueListField {
//   return field.__typename == 'NameValueListField';
// }

function isMultilistField(
  field: IndexableQueryResultFields
): field is IndexableQueryResultMultilistField {
  return field.__typename == 'MultilistField';
}

function isLookupField(
  field: IndexableQueryResultFields
): field is IndexableQueryResultLookupField {
  return field.__typename == 'LookupField';
}

// function isLinkField(field: IndexableQueryResultFields): field is IndexableQueryResultLinkField {
//   return field.__typename == 'LinkField';
// }

// function isIntegerField(
//   field: IndexableQueryResultFields
// ): field is IndexableQueryResultIntegerField {
//   return field.__typename == 'IntegerField';
// }

// function isImageField(field: IndexableQueryResultFields): field is IndexableQueryResultImageField {
//   return field.__typename == 'ImageField';
// }

// function isDateField(field: IndexableQueryResultFields): field is IndexableQueryResultDateField {
//   return field.__typename == 'DateField';
// }

// function isCheckboxField(
//   field: IndexableQueryResultFields
// ): field is IndexableQueryResultChecbokField {
//   return field.__typename == 'CheckboxField';
// }

function mapIndexableField(field: IndexableQueryResultFields): IndexableFields {
  if (isMultilistField(field)) {
    const { __typename, targetItems, ...rest } = field;
    const mapped: IndexableFields = {
      type: __typename,
      targetItems: targetItems?.map((item) => ({
        id: item.id,
        name: item.name,
        url: item.url.path,
        fields: item.fields.map(mapIndexableField),
      })),
      ...rest,
    };
    return mapped;
  } else if (isLookupField(field)) {
    const { __typename, targetItem, ...rest } = field;
    const mapped: IndexableFields = {
      type: __typename,
      targetItem: targetItem
        ? {
            id: targetItem.id,
            name: targetItem.name,
            fields: targetItem.fields.map(mapIndexableField),
          }
        : targetItem,
      ...rest,
    };
    return mapped;
  } else {
    const { __typename, ...rest } = field;
    const mapped: IndexableFields = { type: __typename, ...rest };
    return mapped;
  }
}

export interface GraphQLIndexableServiceConfig extends Omit<SearchServiceConfig, 'siteName'> {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;
  /**
   * The API key to use for authentication
   */
  apiKey: string;
}

/**
 * Service that fetch the sitemaps data using Sitecore's GraphQL API.
 */
export class GraphQLIndexableService {
  private graphQLClient: GraphQLClient;
  private searchService: SearchQueryService<IndexableQueryResult>;

  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL sitemaps service with the provided options
   * @param {GraphQLSitemapXmlServiceConfig} options instance
   */
  constructor(public options: GraphQLIndexableServiceConfig) {
    this.graphQLClient = this.getGraphQLClient();
    this.searchService = new SearchQueryService<IndexableQueryResult>(this.graphQLClient);
  }

  /**
   * Fetch list of sitemaps for the site
   * @returns {string[]} list of sitemap paths
   * @throws {Error} if the siteName is empty.
   */
  async fetchIndexableItems(): Promise<IndexableItem[]> {
    const sitemapResult: Promise<IndexableQueryResult[]> = this.searchService.fetch(this.query, {
      rootItemId: '-',
      language: '-',
    });
    try {
      return sitemapResult.then((results: IndexableQueryResult[]) => {
        return results.map((queryResult) => this.mapQueryResultToIndexableItem(queryResult));
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Map a query result to and indexable item
   * @returns {IndexableItem} list of sitemap paths
   * @param {IndexableQueryResult} queryResult the query result to map
   */
  protected mapQueryResultToIndexableItem(queryResult: IndexableQueryResult): IndexableItem {
    Debug.coveoItemFetcher(queryResult.ancestors);
    const result: IndexableItem = {
      id: queryResult.id,
      name: queryResult.name,
      language: queryResult.language.name,
      parentId: queryResult.parent.id,
      path: queryResult.path,
      urlPath: queryResult.url.path,
      siteName: queryResult.url.siteName,
      version: queryResult.version,
      templateId: queryResult.template.id,
      templateName: queryResult.template.name,
      allTemplateIds: queryResult.template.baseTemplates.map((base) => base.id),
      ancestors: queryResult.ancestors.map((ancestor) => ancestor.id),
      fields: queryResult.fields.map(mapIndexableField),
    };
    return result;
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
      debugger: Debug.coveoItemFetcher,
    });
  }
}

export class GraphQLIndexableServicePlugin {
  private graphQLIndexableService: GraphQLIndexableService;

  order = 0;

  constructor() {
    this.graphQLIndexableService = new GraphQLIndexableService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
    });
  }

  async exec(indexableItems: IndexableItem[]) {
    const results = await this.graphQLIndexableService.fetchIndexableItems();
    return [...indexableItems, ...results];
  }
}

export const graphqlIndexableServicePlugin = new GraphQLIndexableServicePlugin();
