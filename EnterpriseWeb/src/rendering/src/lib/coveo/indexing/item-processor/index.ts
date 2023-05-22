import * as plugins from 'src/temp/coveo-indexing-item-processor-plugins';
import { IndexableItem, SitemapItem } from '../';

export interface Plugin {
  /**
   * Detect order when the plugin should be called, e.g. 0 - will be called first (can be a plugin which data is required for other plugins)
   */
  order: number;
  /**
   * A function which will be called during page props generation
   */
  exec(siteMapItem: SitemapItem, indexableItem: IndexableItem): Promise<SitemapItem>;
}

export class CoveoIndexingItemProcessor {
  /**
   * Create SitecorePageProps for given context (SSR / GetServerSidePropsContext or SSG / GetStaticPropsContext)
   * @param {IndexableItem} indexableItem
   * @see SiteMapItem
   */
  public async process(indexableItem: IndexableItem): Promise<SitemapItem> {
    const extendedProps = await (Object.values(plugins) as Plugin[])
      .sort((p1, p2) => p1.order - p2.order)
      .reduce(async (result, plugin) => {
        const props = await result;
        const newProps = await plugin.exec(props, indexableItem);
        return newProps;
      }, Promise.resolve(new SitemapItem()));

    return extendedProps;
  }
}

export const coveoIndexingItemProcessor = new CoveoIndexingItemProcessor();
