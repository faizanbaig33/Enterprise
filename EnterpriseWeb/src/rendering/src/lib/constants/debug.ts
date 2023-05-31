import debug from 'debug';

const enterpriseWebNamespace = 'entwb';
const coveoRootNamespace = 'coveo';

export type Debugger = debug.Debugger;

// eslint-disable-next-line import/no-anonymous-default-export
export const Debug = {
  coveoItemFetcher: debug(`${coveoRootNamespace}:item-fetcher`),
  productsByBVProductId: debug(`${enterpriseWebNamespace}:productsByBVProductId`),
  robots: debug(`${enterpriseWebNamespace}:robots`),
  sitemapxml: debug(`${enterpriseWebNamespace}:sitemapxml`),
};
