import * as plugins from 'src/temp/coveo-indexing-item-fetcher-plugins';
import { IndexableItem } from '../';

export interface Plugin {
  /**
   * Detect order when the plugin should be called, e.g. 0 - will be called first (can be a plugin which data is required for other plugins)
   */
  order: number;
  /**
   * A function which will be called during page props generation
   */
  exec(indexableItems: IndexableItem[]): Promise<IndexableItem[]>;
}

export class CoveoIndexingItemFetcher {
  /**
   * Create SitecorePageProps for given context (SSR / GetServerSidePropsContext or SSG / GetStaticPropsContext)
   * @param {IndexableItem} indexableItem
   * @see SiteMapItem
   */
  public async fetch(): Promise<IndexableItem[]> {
    const extendedProps = await (Object.values(plugins) as Plugin[])
      .sort((p1, p2) => p1.order - p2.order)
      .reduce(async (result, plugin) => {
        const props = await result;
        const newProps = await plugin.exec(props);
        return newProps;
      }, Promise.resolve([]));

    return extendedProps;
  }
}

export const coveoIndexingItemFetcher = new CoveoIndexingItemFetcher();
