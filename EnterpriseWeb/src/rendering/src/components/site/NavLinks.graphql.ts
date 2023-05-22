import { gql } from 'graphql-request';

const NavLinks = gql`
  fragment navLinks on C__NavigationLink {
    navigationLinkUrl {
      jsonValue
    }
  }
`;

export default NavLinks;
