import type { NextApiRequest, NextApiResponse } from 'next';
import xml from 'xmlbuilder';
import { GraphQLSitemapXmlService } from 'lib/sitemap-xml';
import { normalizeSitecoreDateString } from 'lib/utils/string-utils';
import config from 'temp/config';
import pkg from '../../../package.json';

// If this API needs to be processed by middleware, update the matcher filters in middleware.ts to allow for the API path

const sitemapApi = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  // Set the XML header
  res.setHeader('Content-Type', 'text/xml');

  // Set the cache control header
  const maxage = process.env.NEXT_PUBLIC_ENVIRONMENT != 'Production' ? 10 : 300;
  const staleWhileRevalidate = process.env.NEXT_PUBLIC_ENVIRONMENT != 'Production' ? 59 : 600;
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxage}, stale-while-revalidate=${staleWhileRevalidate}`
  );

  // Resolve site based on hostname
  const hostName = req.headers['host']?.split(':')[0] || 'localhost';
  //const site = siteResolver.getByHost(hostName);
  const site = hostName.includes('renewalbyandersen') ? 'RenewalByAndersen' : 'AndersenWindows';

  // create sitemap graphql service
  const sitemapXmlService = new GraphQLSitemapXmlService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: site,
    language: pkg.config.language, // @TODO: Pull this from the site
  });

  const root = xml
    .create('urlset', { encoding: 'UTF-8' })
    .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    .att('xmlns:xhtml', 'http://www.w3.org/TR/xhtml11/xhtml11_schema.html')
    .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
    .att(
      'xsi:schemaLocation',
      'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.w3.org/TR/xhtml11/xhtml11_schema.html http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd'
    );

  const paths = await sitemapXmlService.fetchPaths();

  paths.forEach((path) => {
    const url = root.ele('url');

    url.ele('loc').text(`https://${hostName}${path.path}`);
    if (path.lastUpdated) {
      url.ele('lastmod').text(normalizeSitecoreDateString(path.lastUpdated));
    }
    url.ele('priority').text(path.priority);
    url.ele('changefreq').text(path.changeFrequency);

    // @TODO: Currently, this will only support generating "en" languages.
    // url.ele('xhtml:link', {
    //   rel: 'alternate',
    //   hreflang: 'x-default',
    //   href: `https://${hostName}${path.path}`,
    // });
    url.ele('xhtml:link', {
      rel: 'alternate',
      hreflang: 'en',
      href: `https://${hostName}${path.path}`,
    });
  });

  return res.status(200).send(root.end());
};

export default sitemapApi;
