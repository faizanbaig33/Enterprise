import { gql } from 'graphql-request';
import navLinks from '../NavLinks.graphql';

const FooterQuery = gql`
  ${navLinks}
  query FooterQuery($datasource: String!, $language: String!) {
    # Datasource query
    # $datasource should be set to the ID of the rendering's datasource item
    datasource: item(path: $datasource, language: $language) {
      id
      name
      ... on HztlFooter {
        footerSocialItems {
          targetItem {
            children {
              results {
                ...navLinks
                ... on IconNavigationLink {
                  navigationLinkIcon {
                    jsonValue
                    alt
                    src
                  }
                  navigationLinkIconTitle {
                    jsonValue
                    value
                  }
                  navigationLinkUrl {
                    jsonValue
                  }
                }
              }
            }
          }
        }
        footerMainNavLinks {
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

export default FooterQuery;
