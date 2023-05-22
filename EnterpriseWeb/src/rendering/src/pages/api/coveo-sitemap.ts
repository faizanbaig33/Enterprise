import { coveoIndexingItemFetcher } from 'lib/coveo/indexing/item-fetcher';
import { coveoIndexingItemProcessor } from 'lib/coveo/indexing/item-processor';
import type { NextApiRequest, NextApiResponse } from 'next';
import xml from 'xmlbuilder';

// If this API needs to be processed by middleware, update the matcher filters in middleware.ts to allow for the API path

async function sendXml(res: NextApiResponse): Promise<void> {
  // Get the indexable items
  const indexableItems = await coveoIndexingItemFetcher.fetch();

  // Run items through processors
  const processedItems = await Promise.all(
    indexableItems.map((indexableItem) => coveoIndexingItemProcessor.process(indexableItem))
  );

  // Convert to XML string
  const root = xml
    .create('urlset', { encoding: 'utf-8' })
    .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
    .att('xmlns:coveo', 'https://www.coveo.com/en/company/about-us')
    .att(
      'xsi:schemaLocation',
      'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd'
    );

  processedItems.forEach((sitemapItem) => {
    const url = root.ele('url');
    sitemapItem.serialize(url);
  });

  // Ensure response is text/xml
  res.setHeader('Content-Type', 'text/xml;charset=utf-8');
  return res.status(200).send(root.end());
}

async function sendHtml(item: string, res: NextApiResponse): Promise<void> {
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  return res.status(200).send(`<html><head><title>${item}</title></head><body /></html>`);
}

const coveoSitemapApi = async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const item = _req.query['item'];
  if (item) {
    if (Array.isArray(item)) {
      return sendHtml(item.join(' '), res);
    } else {
      return sendHtml(item, res);
    }
  } else {
    return await sendXml(res);
  }
};

export default coveoSitemapApi;
