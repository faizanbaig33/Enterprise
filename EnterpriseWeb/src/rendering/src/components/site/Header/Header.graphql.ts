import { gql } from 'graphql-request';

import navLinks from '../NavLinks.graphql';

const HeaderQuery = gql`
  ${navLinks}
  query HeaderQuery($datasource: String!, $language: String!) {
    # Datasource query
    # $datasource should be set to the ID of the rendering's datasource item
    datasource: item(path: $datasource, language: $language) {
      id
      name
      ... on HztlHeader {
        headerMainNavLinks {
          targetItem {
            children {
              results {
                ...navLinks
              }
            }
          }
        }
        headerSecondaryNavLinks {
          targetItem {
            children {
              results {
                ...navLinks
              }
            }
          }
        }
      }
    }
  }
`;

export default HeaderQuery;
