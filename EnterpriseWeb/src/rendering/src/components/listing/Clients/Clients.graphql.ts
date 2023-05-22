import { gql } from 'graphql-request';

export const GET_CLIENTS = gql`
  query Component($where: ItemSearchPredicateGraphType!, $count: Int!) {
    search(where: $where, first: $count, orderBy: { name: "_name", direction: ASC }) {
      results {
        path
        id
        ... on Client {
          clientName {
            jsonValue
          }
          clientLogo {
            jsonValue
          }
          businessVerticals {
            targetItems {
              name
            }
          }
          platforms {
            targetItems {
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_TAXONOMY = gql`
  query Taxonomy {
    platforms: item(
      path: "/sitecore/content/Sandbox/SandboxSite/Data/Tags/Platforms"
      language: "en"
    ) {
      children {
        results {
          id
          name
        }
      }
    }
    businessVerticals: item(
      path: "/sitecore/content/Sandbox/SandboxSite/Data/Tags/Business Verticals"
      language: "en"
    ) {
      children {
        results {
          id
          name
        }
      }
    }
  }
`;
